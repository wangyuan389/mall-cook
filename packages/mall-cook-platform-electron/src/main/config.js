/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:42
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 23:56:00
 */
// @ts-ignore
const ACHEME = "file";
const path=require('path')
// const LOAD_URL = `${ACHEME}://${ __dirname}/index.html`;
const LOAD_URL=`file://${path.join(__dirname, '../../dist/index.html')}`
module.exports={
    ACHEME,
    LOAD_URL
}
