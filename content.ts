import type { PlasmoCSConfig } from "plasmo";
import generateTOTP from "~utils/generateTfaCode";
import waitForElm from "~utils/waitForElem";

export {};

const userName = process.env.PLASMO_PUBLIC_USERNAME;
const passWord = process.env.PLASMO_PUBLIC_PASSWORD;
const tfaSecret = process.env.PLASMO_PUBLIC_TFASECRET;

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
  form.querySelector<HTMLInputElement>("#Ecom_User_ID").value = userName;
  form.querySelector<HTMLInputElement>("#Ecom_Password").value = passWord;
  form.submit();
});

// // 2fa code
waitForElm<HTMLInputElement>("#nffc").then((e) => {
  e.value = generateTOTP({ key: tfaSecret });

  const button = document.getElementsByName(
    "loginButton2",
  )[0] as HTMLButtonElement;
  button.click();
});
