import { sendToBackground } from "@plasmohq/messaging";

async function getItem(key: storageKey): Promise<string> {
  return await sendToBackground({
    name: "get",
    body: {
      key: key,
    },
  });
}

async function setItem(key: storageKey, value: string) {
  sendToBackground({
    name: "set",
    body: {
      key: key,
      value: value,
    },
  });
}

async function clear() {
  sendToBackground({
    name: "clear",
  });
}

export const secureLocalStorage = {
  getItem,
  setItem,
  clear,
};
