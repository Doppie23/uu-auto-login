import type { PlasmoCSConfig } from "plasmo";
import generateTOTP from "~utils/generateTfaCode";
import waitForElm from "~utils/waitForElem";

export {};

export const config: PlasmoCSConfig = {
  matches: [
    "https://login.uu.nl/*",
    "http://login.uu.nl/*",
    "https://mfa.uu.nl/*",
    "http://mfa.uu.nl/*",
  ],
};

// login
waitForElm<HTMLFormElement>("#IDPLogin").then(async (form) => {
  const username = (await chrome.storage.local.get(
    "username",
  )) as storageObject;
  const password = (await chrome.storage.local.get(
    "password",
  )) as storageObject;

  if (!username.username || !password.password) {
    console.log("geen naam of wachtwoord");
    return;
  }

  form.querySelector<HTMLInputElement>("#Ecom_User_ID").value =
    username.username;
  form.querySelector<HTMLInputElement>("#Ecom_Password").value =
    password.password;
  document.querySelector<HTMLButtonElement>("#loginButton2").click();
});

// 2fa code
waitForElm<HTMLInputElement>("#nffc").then(async (e) => {
  const secret = (await chrome.storage.local.get("secret")) as storageObject;
  if (!secret.secret) return;

  e.value = generateTOTP({ key: secret.secret });

  const button = document.getElementsByName(
    "loginButton2",
  )[0] as HTMLButtonElement;
  button.click();
});
