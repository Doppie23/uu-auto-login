import type { PlasmoMessaging } from "@plasmohq/messaging";
import storage from "~lib/secureStorage";

interface reqType {
  key: string;
}

const handler: PlasmoMessaging.MessageHandler<reqType, any> = async (
  req,
  res,
) => {
  res.send(await storage.getItem(req.body.key));
};

export default handler;
