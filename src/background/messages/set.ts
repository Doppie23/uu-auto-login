import type { PlasmoMessaging } from "@plasmohq/messaging";
import storage from "~lib/secureStorage";

interface reqType {
  key: string;
  value: string;
}

const handler: PlasmoMessaging.MessageHandler<reqType, void> = async (
  req,
  res,
) => {
  storage.setItem(req.body.key, req.body.value);
};

export default handler;
