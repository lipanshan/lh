module.exports = {
  publicPath: './',
  productionSourceMap: false,
  chainWebpack: config => {
    config.externals({
      jquery: 'jQuery',
      bootstrap: 'bootstrap'
    })
  }
}