let b = require('substance-bundler')
let path = require('path')

function _buildLib(transpileToES5, cleanup) {
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
    buble: Boolean(transpileToES5),
    cleanup: Boolean(cleanup)
  })
}

function _minifyLib() {
  b.minify('./dist/substance-forms.js', './dist/substance-forms.min.js')
}

b.task('substance:css', function() {
  b.make('substance', 'css')
})

b.task('assets', ['substance:css'], function() {
  b.copy('node_modules/font-awesome', './dist/lib/font-awesome')
  b.copy('./node_modules/substance/substance-reset.css', './dist/substance-reset.css')
  b.css('./lib/substance-forms.css', './dist/substance-forms.css', { variables: true })
})

b.task('clean', function() {
  b.rm('./dist');
})

b.task('example', function() {
  b.copy('./example/index.html', './dist/')
  b.copy('./example/comments.html', './dist/')
})

b.task('lib', function() {
  _buildLib('transpile', 'clean')
  _minifyLib()
})

b.task('lib:dev', function() {
  _buildLib()
})

b.task('default', ['clean', 'assets', 'example', 'lib'])
b.task('dev', ['clean', 'assets', 'example', 'lib:dev'])

b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})
