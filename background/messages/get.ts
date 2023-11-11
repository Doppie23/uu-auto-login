import type { PlasmoMessaging } from "@plasmohq/messaging";
import { SecureStorage } from "@plasmohq/storage/secure";

const storage = new SecureStorage({
  area: "local",
});
storage.setPassword(process.env.PLASMO_PUBLIC_PASSWORD);

type reqType = {
  key: storageKey;
};

const handler: PlasmoMessaging.MessageHandler<reqType, storageKey> = async (
  req,
  res,
) => {
  console.log("test");
  const body = req.body;
  const message = await storage.get<storageKey>(body.key);
  res.send(message);
};

export default handler;
