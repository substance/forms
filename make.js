var b = require('substance-bundler')

b.task('clean', function() {
  b.rm('./dist');
})

b.task('example', function() {
  b.copy('./example/index.html', './dist/')
})

b.task('substance', function() {
  b.copy('./node_modules/substance/dist', './dist/substance')
})

b.task('lib', function() {
  b.js('./src/forms.js', {
    buble: true,
    ignore: ['substance-cheerio'],
    external: ['substance'],
    commonjs: { include: ['/**/node_modules/lodash/**'] },
    targets: [{
      useStrict: false,
      dest: './dist/forms.js',
      format: 'umd', moduleName: 'substance', sourceMapRoot: __dirname, sourceMapPrefix: 'substance'
    }]
  })
})

b.task('default', ['clean', 'example', 'substance', 'lib'])

b.setServerPort(5555)
b.serve({
  static: true, route: '/', folder: 'dist'
})