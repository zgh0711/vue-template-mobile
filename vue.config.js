module.exports = {
  //访问服务器上目录的地址，在程序部署之前根据需要换掉
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dc/'
    : '/',
  
  productionSourceMap: false,

}
