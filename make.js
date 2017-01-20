let b = require('substance-bundler')
let path = require('path')

function _buildLib(transpileToES5) {
  b.js('./lib/substance-forms.js', {
    target: {
      useStrict: !transpileToES5,
      dest: './dist/substance-forms.js',
      format: 'umd', moduleName: 'forms', sourceMapRoot: __dirname, sourceMapPrefix: 'forms'
    },
    // NOTE: do not include XNode (id must be the same as used by DefaultDOMElement)
    ignore: ['./XNode'],
    alias: {
      'substance': path.join(__dirname, 'node_modules/substance/index.es.js')
    },
    buble: transpileToES5
  })
}

function _minifyLib() {
  b.minify('./dist/substance-forms.js', './dist/substance-forms.min.js')
}

b.task('assets', function() {
  b.copy('./node_modules/substance/substance-reset.css', './dist/substance-reset.css')
  b.css('./lib/substance-forms.css', './dist/substance-forms.css', { variables: true })
})

b.task('clean', function() {
  b.rm('./dist');
})

b.task('example', function() {
  b.copy('./example/index.html', './dist/')
})

b.task('lib', function() {
  _buildLib(true)
  _minifyLib()
})

b.task('lib:dev', function() {
  _buildLib(false)
})

b.task('default', ['clean', 'lib', 'assets', 'example'])
b.task('dev', ['clean', 'lib:dev', 'assets', 'example'])

b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})
