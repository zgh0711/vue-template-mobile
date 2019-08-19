const CompressionPlugin = require("compression-webpack-plugin")
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  //访问服务器上目录的地址，在程序部署之前根据需要换掉
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  
  productionSourceMap: false,
  
  //移除 prefetch 插件
  chainWebpack: config =>{
    config.plugins.delete('prefetch')
  },
  
  //build 打包时对文件进行 Gzip 压缩
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240,//对超过10k的数据压缩
            deleteOriginalAssets: false, //不删除源文件
          }),
          //图片质量压缩插件，自动对图片进行压缩
          new ImageminPlugin({
            pngquant: {
              quality: '80-95',
              progressive:true
            }
          })
        ],
      }
    }
  },
}
