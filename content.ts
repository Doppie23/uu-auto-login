import type { PlasmoCSConfig } from "plasmo";
import generateTOTP from "~utils/generateTfaCode";

export {};

const userName = process.env.PLASMO_PUBLIC_USERNAME;
const passWord = process.env.PLASMO_PUBLIC_PASSWORD;
const tfaSecret = process.env.PLASMO_PUBLIC_TFASECRET;

export const config: PlasmoCSConfig = {
  matches: ["https://login.uu.nl/*", "http://login.uu.nl/*"],
};

waitForElm("#Ecom_User_ID").then((e: HTMLInputElement) => {
  e.value = userName;
});

waitForElm("#Ecom_Password").then(async (e: HTMLInputElement) => {
  e.value = passWord;

  const button = document.getElementById("loginButton2") as HTMLButtonElement;
  button.click();
});

// 2fa code
waitForElm("#nffc").then((e: HTMLInputElement) => {
  e.value = generateTOTP({ key: tfaSecret });

  const button = document.getElementsByName(
    "loginButton2",
  )[0] as HTMLButtonElement;
  button.click();
});

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
