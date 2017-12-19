module.exports = {
  plugins: [
    require('postcss-cssnext')(),
    require('postcss-modules')({
      generateScopedName: '[local]'
      // generateScopedName: '[local]-[hash:base64:5]'
    }),
    require('cssnano')()
  ]
}
