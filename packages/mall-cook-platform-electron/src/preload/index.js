/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-05-04 12:40:32
 * @LastEditors: June
 * @LastEditTime: 2023-05-04 12:42:04
 */
const { ipcRenderer, contextBridge } = require ('electron');

ipcRenderer.on('show', (e) => {
    const root = document.querySelector('#app');
    root.style.animation = 'show 0.3s linear forwards';
})

ipcRenderer.on('hide', (e, s) => {
    const root = document.querySelector('#app');
    root.style.animation = `hide ${s}s linear forwards`;
})