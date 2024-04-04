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
    cookiePopup.classList.remove('hidden');
    cookiePopup.classList.add('shown');
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

function getCookie(name) {
    const cookieName = name.replace(/([.*+?^${}()|[\]/\\])/g, '\\$1');
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`));
    return match ? `${name} = ${decodeURIComponent(match[1])}` : 'No cookies with that name';
}

function getBrowser() {
    const userAgent = navigator.userAgent;
    const browserMapping = {
        'Edge': 'Edge',
        'Edg': 'Edge',
        'OPR': 'Opera',
        'Chrome': 'Chrome',
        'Firefox': 'Firefox',
        'Safari': 'Safari'
    };
    let browserName = Object.keys(browserMapping).find(key => userAgent.includes(key)) || 'Unidentified';
    return browserMapping[browserName];
}

function getOperatingSystem() {
    let plat = navigator.userAgent.toLowerCase();
    let os = navigator.userAgent;
    const systems = ['win', 'mac', 'linux', 'android', 'iphone'];
    const name = ['Windows', 'Mac', 'Linux', 'Android', 'IOS'];
    for(let i = 0; i < systems.length; i++) {
        if(plat.includes(systems[i])) {
            os = name[i];
            break;
        }
    }
    return os;
}

function getWidth() {
    return `${window.innerWidth}px`;
}

function getHeight() {
    return `${window.innerHeight}px`;
}

function setAcceptedCookies() {
    let cookieCounter = 0;
    if(browserToggle.checked) {
        setCookie('Browser', getBrowser(), 15);
        cookieCounter++;
    }
    if(osToggle.checked) {
        setCookie('OperatingSystem', getOperatingSystem(), 15);
        cookieCounter++;
    }
    if(widthToggle.checked) {
        setCookie('Width', getWidth(), 15);
        cookieCounter++;
    }
    if(heightToggle.checked) {
        setCookie('Height', getHeight(), 15);
        cookieCounter++;
    }
    if(cookieCounter === 0) {
        setCookie('RejectedAll', 'true', 15);
    }
}

function setAllCookies() {
    setCookie('Browser', getBrowser(), 15);
    setCookie('OperatingSystem', getOperatingSystem(), 15);
    setCookie('Width', getWidth(), 15);
    setCookie('Height', getHeight(), 15);
}

window.onload = function() {
    if(document.cookie.length === 0 && navigator.cookieEnabled) {
        setTimeout(showPopup, 1000);
        checkAllCookies();
    }
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

function printAllCookies() {
    console.log(getCookie('Browser'));
    console.log(getCookie('OperatingSystem'));
    console.log(getCookie('Width'));
    console.log(getCookie('Height'));
    console.log(getCookie('RejectedAll'));
}
printAllCookies();