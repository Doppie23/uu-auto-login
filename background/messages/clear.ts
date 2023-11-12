import type { PlasmoMessaging } from "@plasmohq/messaging";
import storage from "~lib/secureStorage";

interface reqType {
  key: string;
}

const handler: PlasmoMessaging.MessageHandler<any, any> = async (req, res) => {
  storage.clear();
};

export default handler;
