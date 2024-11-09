/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:42
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 23:25:14
 */
const {app,  globalShortcut } = require('electron')

const initShortCut= (win) =>{
    globalShortcut.register('CommandOrControl+f12', () => {
        win.openDevTools()
    })
    // globalShortcut.register('CommandOrControl+X', () => {
    //     console.log('CommandOrControl+X is pressed')
    // })
    // globalShortcut.register('g', () => {
    //     console.log('g')
    //     if(global.mainWindow){
    //         global.mainWindow.webContents.send('on-shortcut-event','g')
    //     }
    //
    // })
}
const unInstallShortCut=()=>{
    // 注销快捷键
    globalShortcut.unregister('CommandOrControl+f12')
    globalShortcut.unregister('CommandOrControl+X')
    globalShortcut.unregister('g')
    // 注销所有快捷键
    globalShortcut.unregisterAll()
}
module.exports={
    initShortCut,
    unInstallShortCut
}
