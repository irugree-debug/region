
let getSkin = -1;

let showLogin = (username) => {
    document.getElementById('form').style.display = 'block';
    document.getElementById('name').innerText = 'Добро пожаловать на сервер, ' + username;
}

let showHud = () => {
    document.getElementById('hud').style.display = 'block';
}

let showSecret = (question) => {
    document.getElementById('form').style.display = 'block';
    document.getElementById('secret').style.display = 'block';
    document.getElementById('question').innerText = question;
}

let resetWindow = () => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementsByClassName('form')[0].style.display = 'none';

}

cef.on('login:show', (username) => {

    showLogin(username);

})

cef.on('login:secret', (question) => {
	showSecret(question);
})

function loginAttempt(){
    const password = document.getElementById('log-password').value;
    resetError();

    let attemp = password;
	console.log(password);
    cef.emit('pwd:try', attemp);
}

function secretAttempt(){
    const secret = document.getElementById('log-secret').value;
    resetError();

    let attemp = secret;
	console.log(secret);
    cef.emit('sct:try', attemp);
}

function screenDimming() {
    document.getElementById('bodyd').style.backgroundColor = ''
    document.getElementById('bodyd').style.transition = '2s'
}

function registerAttempt(){

    const login = document.getElementById('reg-login').placeholder;
    const mail = document.getElementById('reg-mail').value;
    const password = document.getElementById('reg-password').value;
    const passwordConfirm = document.getElementById('reg-password-confirm').value;
    const gender_female = document.getElementById('female');
    const gender_male = document.getElementById('male');

    resetError();

    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(!mail || mail.length < 3 || reg.test(mail) == false){
        return showError('Введите корректный email');
    }
    let pass_r =/^[A-Za-z0-9]{6,18}$/;
    if(pass_r.test(password) == false)
        return showError('Пароль может из состоять из латинских букв и цифр (Содержать от 6 до 18 символов)')

    if(password != passwordConfirm){
        return showError('Пароли не совпадают');
    }

    if(gender_male.checked == false && gender_female.checked == false)
        return showError('Выбери пол персонажа');


    if(getSkin == -1)
        return showError('Выбери скин персонажа');

    const skin = [6, 22, 48, 56, 69, 41];

    const gender = gender_male.checked == false ? 1 : 2;
    let attemp = login + ',' + password + ',' + mail + ',' + gender  + ',' + skin[getSkin-1];
    cef.emit('pwd:reg', attemp);
    resetWindow()
    document.getElementById('bodyd').style.backgroundColor = '#000'
    document.getElementById('bodyd').style.transition = '0.5s'
    setTimeout(screenDimming, 4000);
}


cef.on('error:msg', (response) => {
    showError(response)
});

cef.on('login:password', (response) => {
    if(response == 1) {
        resetWindow();
    }

});

cef.on('login:secret', (response) => {
    if(response == 1) {
        resetWindow();
    }

});

function onExitClick(event) {
    //serverResponse.innerText = "Close";
    cef.emit('pwd:exit_forms');
}

cef.on('pwd:login_succes', (response) => {

    if (response == 1) {
        cef.set_focus(false);
        cef.hide(true);
        cef.emit('pwd:exit_forms');
    } else {
        //serverResponse.innerText = "Вы успешно авторизовались!";
        cef.hide(true); //скрываем браузер
        cef.set_focus(false); //убираем фокусирование с браузера
        resetWindow()
    }
});

function showError(message){
    const errorBlock = document.getElementById('error');
    errorBlock.innerText = message;
    errorBlock.style.display = 'block';
}

function resetError(){
    const errorBlock = document.getElementById('error');
    errorBlock.innerText = 'message';
    errorBlock.style.display = 'none';
}

function clickgender(res) {
    if(res == 1) {
        document.querySelector('#cc-selector-fem').style.display = 'none';
        document.querySelector('#cc-selector').style.display = 'block';
    } else {
        document.querySelector('#cc-selector-fem').style.display = 'block';
        document.querySelector('#cc-selector').style.display = 'none';
    }
}

function isCheckedSkinGender(res) {
   return getSkin = res;
}
