import { sendToBackground } from "@plasmohq/messaging";
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

(async () => {
  const body = await sendToBackground<void, storageObject>({
    name: "getAll",
  });

  waitForElm<HTMLFormElement>("#IDPLogin").then(async (form) => {
    form.querySelector<HTMLInputElement>("#Ecom_User_ID").value = body.naam;
    form.querySelector<HTMLInputElement>("#Ecom_Password").value =
      body.wachtwoord;
    form.submit();
  });

  // 2fa code
  waitForElm<HTMLInputElement>("#nffc").then(async (e) => {
    e.value = generateTOTP({ key: body.secret });

    const button = document.getElementsByName(
      "loginButton2",
    )[0] as HTMLButtonElement;
    button.click();
  });
})();

// login
