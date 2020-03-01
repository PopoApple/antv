const md5 = require('md5')

// 3.5	前端端调用签名(MD5)-Signature
// 
// Signature生成算法（适用于前端端调用）：
// 1.	将AccessToken、Timestamp以及对应接口参数，按照参数名的字典升序排序
// 2.	将排序后的参数键值对用&拼接，即拼接成key1=val1&key2=val2…
// 3.	将参数拼接后的字符串，进行md5加密（字符集为UTF-8），得到md5加密串就是Signature


export function signature(params) {

  // 参数对象
  const paramsObject = params || {}


  // 参数数组
  const paramsArray = []
  // 参数字符串（按照 key=value 用 & 拼接为字符串）
  let paramsString = ''

  // 所有参数用 key=value 形式连接起来
  for (let key in paramsObject) {
    paramsArray.push(key + '=' + paramsObject[key])
  }
  // 参数按照字典升序排序
  paramsArray.sort(function (key1, key2) {
    if (key1 > key2) {
      return 1
    }
    else if (key1 < key2){
      return -1
    }
    else {
      return 0
   }
  })

  // 参数按照 key=value 用 & 拼接为字符串
  paramsString = paramsArray.join('&')

  // 计算签名（参数字符串进行 md5 加密）
  return md5(paramsString)
}
