module.exports = `var host = \`
# 127.0.0.1 www.baidu.com
\`

var rules = [
  // {
  //   regx: /^https?://.*.baidu.com/,
  //   httpStatus: '404'
  // }
]

module.exports = {
  host: host,
  rules: rules,
  enableSSLProxying: false,
  SSLProxyList: []
}`;