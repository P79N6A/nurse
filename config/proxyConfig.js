/**
 * Created by hokai on 2018/7/10.
 */
module.exports = {
  proxyList: {
    '/': {
// 测试环境
      target: 'http://192.168.1.32:8080/', // 接口域名
      // target: 'http://yidongyihu.com', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/': 'http://192.168.1.32:8080/' //需要rewrite重写的
        // '^/': 'http://yidongyihu.com/' //需要rewrite重写的,
      }
    }
  }
}
// http://192.168.1.32:8080/
