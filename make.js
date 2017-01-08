var b = require('substance-bundler')

function _buildLib(transpileToES5) {
  b.copy('./node_modules/substance/dist', './dist/substance')
  b.js('./lib/substance-forms.js', {
    buble: transpileToES5,
    ignore: ['substance-cheerio'],
    external: ['substance'],
    targets: [{
      useStrict: !transpileToES5,
      dest: './dist/substance-forms.js',
      format: 'umd', moduleName: 'substance', sourceMapRoot: __dirname, sourceMapPrefix: 'substance'
    }]
  })
}

b.task('assets', function() {
  b.css('./lib/substance-forms.css', './dist/substance-forms.css', { variables: true })
})

b.task('clean', function() {
  b.rm('./dist');
})

b.task('example', function() {
  b.copy('./example/index.html', './dist/')
})

b.task('substance', function() {
  b.make('substance', 'clean', 'browser')
})

b.task('substance:pure', function() {
  b.make('substance', 'clean', 'browser:pure')
})

b.task('lib', function() {
  _buildLib(true)
})

b.task('lib:pure', function() {
  _buildLib(false)
})

b.task('default', ['clean', 'example', 'substance', 'lib', 'assets'])
b.task('dev', ['clean', 'example', 'substance:pure', 'lib:pure', 'assets'])

b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})
