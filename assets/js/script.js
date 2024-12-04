'use strict';

import { listen, select } from './utils.js';

function setCookie(name, value, seconds) {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, val] = cookie.split("=");
        if (key === name) return val;
    }
    return null;
}

function getBrowserName() {
    const userInfo = navigator.userAgent;
    if (userInfo.includes("Chrome")) return "Chrome";
    if (userInfo.includes("Firefox")) return "Firefox";
    if (userInfo.includes("Safari") && !userInfo.includes("Chrome")) return "Safari";
    return "Unknown Browser";
}

function getOSName() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "MacOS";
    if (platform.includes("linux")) return "Linux";
    return "Unknown OS";
}

const acceptModal = select(".cookie-accept");
const chooseCookiesModal = select(".cookie-choices");

if (!getCookie("browser") || !getCookie("os") || !getCookie("screen")) {
    setTimeout(() => {
        acceptModal.style.display = "flex";
    }, 1000);
}


function acceptAll() {
  const browser = select(".toggle-switch.browser").checked ? getBrowserName() : "Not Saved";
  const os = select(".toggle-switch.os").checked ? getOSName() : "Not Saved";
  const screenDimensions = select(".toggle-switch.screen").checked ? `${screen.width}x${screen.height}` : "Not Saved";

  if (browser !== "Not Saved") setCookie("browser", browser, 15);
  if (os !== "Not Saved") setCookie("os", os, 15);
  if (screenDimensions !== "Not Saved") setCookie("screen", screenDimensions, 15);
}

listen(select(".accept-all"), "click", () => {
    acceptAll();
    acceptModal.style.display = "none";
});

listen(select(".settings"), "click", () => {
    acceptModal.style.display = "none";
    chooseCookiesModal.style.display = "flex";
});

listen(select(".save-settings"), "click", () => {
    acceptAll();
    chooseCookiesModal.style.display = "none";
});