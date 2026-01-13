import type { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";

const handleClerkWebhook = async (req: Request, res: Response) => {
  try {
    const evt = await verifyWebhook(req);
    console.log("hello");
    console.log("Webhook payload:", evt.data);

    return res.send("Webhook received");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
};
export default handleClerkWebhook;
