/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:42
 * @LastEditors: June
 * @LastEditTime: 2023-03-08 19:37:06
 */
const { app, Menu, Tray,nativeImage } = require('electron')
const path=require('path')
let appIcon = null
const initTray=()=>{
    const iconPath = path.join(__dirname, '/icone.ico').replace('/\\/g','\\\\');
    appIcon = new Tray(nativeImage.createFromPath(iconPath))
    appIcon.setToolTip('Mall-Cook') // 鼠标指针在托盘图标上悬停时显示的文本
    const contextMenu = Menu.buildFromTemplate([
        { 
            label: '退出',
            type: 'radio',
            click: ()=>{
                app.quit()
            },
            checked: true
        },
        { label: '测试占位', type: 'radio' }
    ])

    // Call this again for Linux because we modified the context menu
    appIcon.setContextMenu(contextMenu)
}

module.exports={
    initTray
}
