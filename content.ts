import type { PlasmoCSConfig } from "plasmo";
import generateTOTP from "~utils/generateTfaCode";
import { secureLocalStorage } from "~utils/localStorage";
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
  const username = await secureLocalStorage.getItem("username");
  const password = await secureLocalStorage.getItem("password");

  if (!username || !password) {
    console.log("geen naam of wachtwoord");
    return;
  }

  form.querySelector<HTMLInputElement>("#Ecom_User_ID").value = username;
  form.querySelector<HTMLInputElement>("#Ecom_Password").value = password;
  document.querySelector<HTMLButtonElement>("#loginButton2").click();
});

// 2fa code
waitForElm<HTMLInputElement>("#nffc").then(async (e) => {
  const secret = await secureLocalStorage.getItem("secret");

  if (!secret) return;

  e.value = generateTOTP({ key: secret });

  const button = document.getElementsByName(
    "loginButton2",
  )[0] as HTMLButtonElement;
  button.click();
});
