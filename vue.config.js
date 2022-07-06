const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', //代理目标的基本路径
        pathRewrite:{'^/api':''},//重写路径：去掉路径中开头的'/api'
      }
    }
  }
})
