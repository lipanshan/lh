module.exports = {
  chainWebpack: config => {
    config.externals({
      jquery: 'jQuery',
      bootstrap: 'bootstrap',
      Vue: 'vue',
      Router: 'vue-router'
    })
  }
}