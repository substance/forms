let b = require('substance-bundler')

const GLOBALS = {
  'substance': 'window.substance'
}

const EXTERNALS = ['substance']

function _buildLib(production) {
  b.js('./lib/substance-forms.js', {
    dest: './dist/substance-forms.js',
    format: 'umd', moduleName: 'forms',
    globals: GLOBALS,
    external: EXTERNALS,
    buble: Boolean(production),
    cleanup: Boolean(production)
  })
}

function _minifyLib() {
  b.minify('./dist/substance-forms.js', './dist/substance-forms.min.js')
}

b.task('assets', function() {
  b.copy('./node_modules/font-awesome', './dist/lib/font-awesome')
  b.copy('./node_modules/substance/dist/substance.js*', './dist/lib/')
  b.css('./node_modules/substance/substance-reset.css', './dist/substance-reset.css')
  b.css('./lib/substance-forms.css', './dist/substance-forms.css', { variables: true })
})

b.task('clean', function() {
  b.rm('./dist');
})

b.task('examples', function() {
  b.copy('./examples/index.html', './dist/')
  b.copy('./examples/comments.html', './dist/')
})

b.task('lib', function() {
  _buildLib('production')
  _minifyLib()
})

b.task('dev:lib', function() {
  _buildLib()
})

b.task('default', ['clean', 'assets', 'examples', 'lib'])
b.task('dev', ['clean', 'assets', 'examples', 'dev:lib'])

b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})
