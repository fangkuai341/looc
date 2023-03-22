const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    proxy: {
      "/books": {
        target: "http://localhost:8080",
        changeOrigin: false,
        ws: false,
      },
      "/account": {
        target: "http://localhost:8080",
        changeOrigin: false,
        ws: false,
      },
      "/words": {
        target: "http://localhost:8080",
        changeOrigin: false,
        ws: false,
      },
      "/dictvoice": {
        target: "https://dict.youdao.com",
        changeOrigin: false,
        ws: false,
      },
    }
  }
})
