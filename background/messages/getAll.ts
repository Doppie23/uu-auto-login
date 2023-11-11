import type { PlasmoMessaging } from "@plasmohq/messaging";
import { SecureStorage } from "@plasmohq/storage/secure";

const storage = new SecureStorage({
  area: "local",
});
storage.setPassword(process.env.PLASMO_PUBLIC_PASSWORD);

const handler: PlasmoMessaging.MessageHandler<void, storageObject> = async (
  req,
  res,
) => {
  const message = await storage.getAll();
  let obj = {};
  for (const [key, value] of Object.entries(message)) {
    obj[key] = await storage.get(key);
  }
  console.log(obj);
  res.send(obj);
};

export default handler;
