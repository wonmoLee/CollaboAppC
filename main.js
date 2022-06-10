/**
 * Author: wonmoLee 
 * Date: 2022.05.29
 * GitHub: https://github.com/wonmoLee
 * Blog: https://wonmolee.github.io
 * 
 * - Revision history -
 * 
 */

const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;
const url = require('url');
const path = require('path');
const io = require('socket.io-client');
const axios = require('axios');
const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000'
});
const handler_manager = require('./handler_manager');
const SocketService = require('./service/socketService');
const { ipcRenderer } = require('electron');
const SocketEvent = require('./handler_manager/event/socketEvent');
let win;
let socket;
let modal;
let waitDialog;
let listener;
let errorListener;
const displayLoginWindow = (event, message)=>{
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    const options = {
        width: width-200,
        height: height-50,
        resizeable: false,
        fullscreenable: false,
        show: false,
        webPreferences: {
            affinity:true,
            nodeIntegration: true
        }
    };
    win = new BrowserWindow(options);
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file',
        slashes: true
    }));
    win.webContents.openDevTools(); // 개발자도구
    win.once('ready-to-show', ()=>{
        console.log('ready-to-show');
        win.show();
    });
    win.on('closed', ()=>{
        console.log('window closed');
        win = null;
        app.quit();
    });
}
const displaySignUpModal = (event, message)=>{
    win.webContents.send('hide-page');
    modal = new BrowserWindow({
        parent: win,
        modal: true,
        show: false
    });
    modal.loadURL(url.format({
        pathname: path.join(__dirname, 'signUpModal.html'),
        protocol: 'file:'
    }));
    modal.on('ready-to-show', ()=>{
        modal.show();
    })
    modal.on('closed', ()=>{
        modal = null;
    })
};
const destroySignUpModal = (event, message)=>{
    win.webContents.send('hide-page');
    modal.close();
};
const createSignUpRequest = (event, message)=>{
    httpInstance.post('/users', message)
    .then((response)=>{
        event.sender.send('signUpRequest-Success', response.data);
    })
    .catch((error)=>{
        const result = {
            status: error.response.status,
            statusText: error.response.statusText
        }
        event.sender.send('signUpRequest-Failed', result);
    });
};
const displayWaitDialog = (event, message)=>{
    const options = {
        width: 800,
        height: 800,
        resizeable: false,
        fullscreenable: false,
        show: false,
        frame: false,
        webPreferences: {
            affinity:true,
            nodeIntegration: true
        }
    };
    waitDialog = new BrowserWindow(options);
    waitDialog.loadURL(url.format({
        pathname: path.join(__dirname, 'waitDialog.html'),
        protocol: 'file',
        slashes: true
    }));
    waitDialog.once('ready-to-show', ()=>{
        win.hide();
        waitDialog.show();
        const socketURL = 'ws://127.0.0.1:3000';
        const socketOptions = {
            transports: ['websocket'],
            forceNew: true,
            query: {
                token: message.data.token
            }
        };
        socket = SocketService.createSocket(io, socketURL, socketOptions);
        listener = SocketService.addHandler(socket, waitDialog, handler_manager[SocketEvent.CONNECT]);
        errorListener = SocketService.addHandler(socket, waitDialog, handler_manager[SocketEvent.ERROR]);
    });
    waitDialog.on('closed', ()=>{
        waitDialog = null;
    });
};
const destroyWaitDialog = (event, message)=>{
    socket.removeListener('connect', listener);
    socket.removeListener('error', errorListener);
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file',
        slashes: true
    }));
    setTimeout(function(){
        SocketService.addHandlers(socket, win, handler_manager);
        SocketService.addHandler(socket, win, handler_manager[SocketEvent.CONNECT]);
        SocketService.addHandler(socket, win, handler_manager[SocketEvent.ERROR]);
        SocketService.addHandler(socket, win, handler_manager[SocketEvent.DISCONNECT]);
        waitDialog.close();
        win.show();
    }, 2000);
    // win.once('ready-to-show') 아래 함수가 작동하지않아 setTimeout 임시작성
    // win.once('ready-to-show', ()=>{
    //     SocketService.addHandlers(socket, win, handler_manager);
    //     waitDialog.close();
    //     win.show();
    // });
};
app.on('ready', displayLoginWindow);
ipcMain.on('displayWaitDialog', displayWaitDialog);
ipcMain.on('destroyWaitDialog', destroyWaitDialog);
ipcMain.on('displaySignUpModal', displaySignUpModal);
ipcMain.on('destroySignUpModal', destroySignUpModal);
ipcMain.on('signUpRequest', createSignUpRequest);
ipcMain.on('signInRequest', (event, message)=>{
    httpInstance.post('/users/login', message)
    .then((response)=>{
        event.sender.send('signInRequest-Success', response);
    })
    .catch((error)=>{
        const result = {
            status: error.response.status,
            statusText: error.response.statusText
        }
        event.sender.send('signInRequest-Failed', result);
    });
})

app.on('window-all-closed', ()=>{
    app.quit();
});
app.on('activate', ()=>{
    app.quit();
});