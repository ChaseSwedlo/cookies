'use strict';

const acceptButton = document.querySelector('.accept');
const settingsButton = document.querySelector('.settings');
const contentOne = document.querySelector('.content-one');
const contentTwo = document.querySelector('.content-two');
const cookiePopup = document.querySelector('.popup');
const browserToggle = document.querySelector('.browser');
const osToggle = document.querySelector('.os');
const widthToggle = document.querySelector('.width');
const heightToggle = document.querySelector('.height');
const savePref = document.querySelector('.savePref');
let noCookies = false;

function showPopup() {
    if(document.cookie.length === 0) {
        cookiePopup.classList.remove('hidden');
        cookiePopup.classList.add('shown');
    }
}

function checkAllCookies() {
    browserToggle.checked = true;
    osToggle.checked = true;
    widthToggle.checked = true;
    heightToggle.checked = true;
    noCookies = false;
}

function setCookie (name, value, maxAge) {
    const options = {
        path: '/',
        'max-age': maxAge,
        SameSite: 'Lax',
    };
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    Object.keys(options).forEach(key => {
        cookieString += `; ${key}=${options[key]}`;
    });
    document.cookie = cookieString;
}

function getCookies(name) {
    const cookieName = name.replace(/([.*+?^${}()|[\]/\\])/g, '\\$1');
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`));
    return match ? `${name} = ${decodeURIComponent(match[1])}` : 'No cookies with that name';
}

function setAcceptedCookies() {
    let cookieCounter = 0;
    if(browserToggle.checked) {
        setCookie('Browser', 'Chorme', 15);
        cookieCounter++;
    }
    if(osToggle.checked) {
        setCookie('OperatingSystem', 'Win', 15);
        cookieCounter++;
    }
    if(widthToggle.checked) {
        setCookie('Width', '1920', 15);
        cookieCounter++;
    }
    if(heightToggle.checked) {
        setCookie('Height', '1080', 15);
        cookieCounter++;
    }
    if(cookieCounter === 0) {
        console.log('test');
        setCookie('RejectedAll', 'true', 15);
    }
}

function setAllCookies() {
    setCookie('Browser', 'Chorme', 15);
    setCookie('OperatingSystem', 'Win', 15);
    setCookie('Width', '1920', 15);
    setCookie('Height', '1080', 15);
}

window.onload = function() {
    setTimeout(showPopup, 1000);
    checkAllCookies();
    console.log(document.cookie.length);
  };

settingsButton.addEventListener('click', (event) => {
    event.preventDefault();
    contentOne.classList.add('display-none');
    contentTwo.classList.remove('display-none');
});

acceptButton.addEventListener('click', (event) => {
    event.preventDefault();
    cookiePopup.classList.remove('shown');
    cookiePopup.classList.add('hidden');
    setAllCookies();
});

savePref.addEventListener('click', (event) => {
    event.preventDefault();
    cookiePopup.classList.remove('shown');
    cookiePopup.classList.add('hidden');
    setAcceptedCookies();
});
console.log(document.cookie);