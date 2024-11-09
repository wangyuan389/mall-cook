/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:42
 * @LastEditors: June
 * @LastEditTime: 2023-05-19 11:13:19
 */
const { app, Menu, Tray, nativeImage, dialog, BrowserWindow } = require('electron')
const path=require('path')
let tray = null
const initTray=(win)=>{
    const iconPath = path.join(__dirname, '/icon.ico').replace('/\\/g','\\\\');
    tray = new Tray(nativeImage.createFromPath(iconPath))
    tray.setToolTip('Mall-Cook') // 鼠标指针在托盘图标上悬停时显示的文本
    const contextMenu = Menu.buildFromTemplate([
        {
            label: "前往仓库",
            click: function() {
                subWin = new BrowserWindow({
                    width: 700,
                    height: 500,
                    frame: false,
                    useContentSize: false,
                    resizable: false,
                    skipTaskbar: true,
                    transparent: false,
                    webPreferences: {
                      nodeIntegration: true,
                    },
                    backgroundColor: "#F5F5F5",
                });
                subWin.loadURL('https://chrome.google.com/webstore/category/extensions');
                subWin.webContents.on('did-fail-load', (err) => {
                    dialog.showMessageBox({
                        type: "error",
                        title: `链接打开失败;${err || ''}`,
                        message: `关于${pjson.name}\n当前版本 ${pjson.version}`
                    })
                    subWin = null
                })
            },
        },
        {
            label: '设置',
            submenu: [
                {
                    label: '开机自启',
                    type: 'checkbox',
                    checked: app.getLoginItemSettings().openAtLogin,
                    click: function() {
                        const curStatus =  app.getLoginItemSettings().openAtLogin
                        if(!app.isPackaged) {
                            app.setLoginItemSettings({
                                openAtLogin: !curStatus,
                                path: process.execPath
                            })
                        } else {
                            app.setLoginItemSettings({
                                openAtLogin: !curStatus
                            })
                        }
                    }
                }
            ]
        },
        {
            label: "关于",
            click: function() {
              let pjson = require("../../../package.json");
              const options = {
                type: "info",
                title: `关于`,
                message: `关于${pjson.name}\n当前版本 ${pjson.version}`,
                buttons: [],
              };
              dialog.showMessageBox(options);
            },
        },
        { 
            label: '退出',
            type: 'radio',
            click: ()=>{
                app.quit()
            },
            checked: true
        },
        // { label: '测试占位', type: 'radio' }
    ])

    // Call this again for Linux because we modified the context menu
    tray.setContextMenu(contextMenu)

    win && tray.on('click', () => {
        if(!BrowserWindow.getAllWindows().length) return
        const winIsVisible = win.isVisible()
        // 窗口是否隐藏
        if (!winIsVisible) {
            win.show()
            // 展示加载动画
            win.webContents.send('show')
        } else {
            const s = 0.3
            // 展示退出动画
            win.webContents.send('hide', s)

            // 退出动画加载完之后再隐藏程序
            let timer = setTimeout(() => {
                win.hide()
                clearTimeout(timer)
                timer = null
            }, s * 1000)
        }
    })
}

module.exports={
    initTray
}
