/*
 * @Description: 全局请求封装
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:29:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-01-24 09:53:32
 */
// const token = ''
const baseUrl = 'http://110.42.184.128:3000'

const request = (url, data, method = 'POST') => {
  return new Promise((resolve, reject) => {
    uni
      .request({
        url: baseUrl + url,
        data,
        method: method
        // header: {
        //   token: token
        // }
      })
      .then(response => {
       let [error, res] = response;
        console.log('成功.')
        console.log(res.data)

        resolve(res.data)
      })
      .catch(res => {
        reject(err)
      })
  })
}

export default request
