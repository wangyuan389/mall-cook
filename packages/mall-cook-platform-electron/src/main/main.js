/*
 * @Descripttion: 
 * @version: 
 * @Author: June
 * @Date: 2023-03-07 18:15:36
 * @LastEditors: June
 * @LastEditTime: 2023-05-19 11:13:38
 */
const { app, BrowserWindow } =require ('electron')
const { initTray } = require('./tray/index.js')
const { initShortCut, unInstallShortCut } = require('./shortcut/index')
const { createMenu } = require('./menu/index')
const { LOAD_URL } = require('./config.js')
const path = require('path')
const isDev = require('electron-is-dev')

//客户端尺寸位置记忆插件
const windowStateKeeper = require('electron-window-state')
const loadWinURL = isDev ? `http://localhost:5173/#/` : `${LOAD_URL}`;

let win = null

const createLoadWindow = (BrowserWindow) => {
    // 默认窗口尺寸
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });
    win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: 1080, 
        height: 960,
        focusable: true,
        backgroundColor: '#fff',
        show: false,
        frame: true,
        resizable: true,
        fullscreenable: true,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, '..', 'preload/index.js')
        },
    })
    // 加载页面地址 线上内网可切换地址
    win.loadURL(`${loadWinURL}`)
    // // 管理客户端尺寸位置记忆插件
    // mainWindowState.manage(win);
    // // 开发者工具
    // win.webContents.openDevTools()
    // 优雅打开界面
    win.on('ready-to-show',()=>{
        win.show()
        // win.openDevTools();
    })
}


app.whenReady().then(()=>{
    createLoadWindow(BrowserWindow)
    createMenu()
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createLoadWindow(BrowserWindow)
    })
    win && initTray(win)
    // 初始化快捷键
    win && initShortCut(win)
})
// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
// 客户端聚焦
app.on('browser-window-focus',()=>{
    // 初始化快捷键
    initShortCut()
})
// 客户端失去焦点
app.on('browser-window-blur',()=>{
    // 注销快捷键
    unInstallShortCut()
})
app.on('will-quit', () => {
    // 注销快捷键
    unInstallShortCut()
})
