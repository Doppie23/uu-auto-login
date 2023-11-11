import type { PlasmoMessaging } from "@plasmohq/messaging";
import { SecureStorage } from "@plasmohq/storage/secure";

const storage = new SecureStorage({
  area: "local",
});
storage.setPassword(process.env.PLASMO_PUBLIC_PASSWORD);

type reqType = {
  body: storageObject;
};

const handler: PlasmoMessaging.MessageHandler<reqType, void> = async (
  req,
  res,
) => {
  const body = req.body;
  for (const [key, value] of Object.entries(body)) {
    storage.set(key, value);
  }
};

export default handler;
