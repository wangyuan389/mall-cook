/*
 * @Description: 全局请求封装
 * @Autor: WangYuan
 * @Date: 2022-01-24 09:29:01
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-11-01 18:35:35
 */
const baseUrl = 'http://139.196.223.93/mall-cook/api'
// const baseUrl = 'https://www.lanshan-h5.cn'

const request = (url, data, method = 'POST') => {
  console.log('执行');
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
        console.log(res)

        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default request
