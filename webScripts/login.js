/**
 * Author: wonmoLee 
 * Date: 2022.05.31
 * GitHub: https://github.com/wonmoLee
 * Blog: https://wonmolee.github.io
 * 
 * - Revision history -
 * 
 */

(()=>{
    const electron = require('electron');
    const ipcRenderer = electron.ipcRenderer;
    const socketEvent = require('././handler_manager/event/socketEvent');
    ipcRenderer.on(socketEvent.HELLO, (event, message)=>{
        console.log(message);
    });
    const userIdInput = document.getElementById('user-id-input');
    const userPasswordInput = document.getElementById('user-password-input');
    const signInButton = document.getElementById('button-SignIn');
    const signUpButton = document.getElementById('button-SignUp');
    const hidePage = document.getElementById('hide-page');

    // 아이디 입력 박스 이벤트
    userIdInput.addEventListener('keypress', ()=>{
        if(window.event.keyCode != 13) {
            return;
        };

        if(userIdInput.value == null || userIdInput.value == "" || userPasswordInput.value == null || userPasswordInput.value == "") {
            alert("아이디 또는 패스워드를 입력하세요.");
            return;
        };

        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id: id,
            password: password
        };
        ipcRenderer.send('signInRequest', parameter);
    });

    // 패스워드 입력 박스 이벤트
    userPasswordInput.addEventListener('keypress', ()=>{
        if(window.event.keyCode != 13) {
            return;
        };
        if(userIdInput.value == null || userIdInput.value == "" || userPasswordInput.value == null || userPasswordInput.value == "") {
            alert("아이디 또는 패스워드를 입력하세요.");
            return;
        };
        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id: id,
            password: password
        };
        ipcRenderer.send('signInRequest', parameter);
    });

    signInButton.addEventListener('click', ()=>{
        const id = userIdInput.value;
        const password = userPasswordInput.value;
        const parameter = {
            id: id,
            password: password
        };
        ipcRenderer.send('signInRequest', parameter);
    });
    ipcRenderer.on('signInRequest-Success', (event, message)=>{
        console.log(message);
        alert('로그인 성공');
        ipcRenderer.send('displayWaitDialog', message);
    });
    ipcRenderer.on('signInRequest-Failed', (event, message)=>{
        console.log(message);
        alert(message.statusText);
    });
    ipcRenderer.on('hide-page', (event, message)=>{
        hidePage.classList.toggle('on');
    })
    signUpButton.addEventListener('click', ()=>{
        ipcRenderer.send('displaySignUpModal');
    });
})();