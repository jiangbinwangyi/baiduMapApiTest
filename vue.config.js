module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  filenameHashing: false,
  chainWebpack: config => {
    //config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
			"echarts": "echarts",
			"BMap": "BMap"
    }
  },
  devServer: {
    proxy: {
      '/ssh': {
        target: 'http://192.168.168.5:11111',
        changeOrigin: true
      }
    }
  }
}
