export default {
  /**
   * 文件大小格式化
   * @param size 单位byte
   */
  formatFileSize(size) {
    const range = size < 1024 * 1024 ? 0 : size < 1024 * 1024 * 1024 ? 1 : 2

    switch (range) {
      case 0:
        return `${Number.prototype.toFixed.call(size / 1024)}K`
      case 1:
        return `${Number.prototype.toFixed.call(size / (1024 * 1024))}M`
      case 2:
        return `${Number.prototype.toFixed.call(size / (1024 * 1024 * 1024))}G`
    }
  },
  /**
   * 格式化时间
   * @param time Date对象与'1970/01/01 00:00:00'之间的毫秒值
   * 输出 2017-04-18 12:30:00 格式的时间
   */
  formatTimeMsToDate(time) {
    let d = new Date(time)
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let day = d.getDate()
    let hour = d.getHours()
    let minutes = d.getMinutes()
    let second = d.getSeconds()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minutes = minutes < 10 ? '0' + minutes : minutes
    second = second < 10 ? '0' + second : second

    return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
  },
  /**
   * 格式化时间
   * @param date 输入 2017-04-18 12:30:00 格式的时间
   * 去掉 2017-04-18 12:30:00 的秒（后3位）
   */
  formatTimeNoSecond(date) {
    return date.slice(5, -3)
  },
  /**
   * 手机号脱敏处理
   */
  formatUserAccount: function (account) {
    let reg = /^(13|14|15|16|17|18|19)+[0-9]{9}$/
    let phone = account.slice(0, 11)
    if (reg.exec(phone)) {
      return account.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
    }
    return account
  }
}
