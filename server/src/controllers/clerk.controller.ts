import type { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { deleteUser, upsertUser } from "../services/user.service.js";
import { syncClerkMetaData } from "../services/clerk.service.js";

const handleClerkWebhook = async (req: Request, res: Response) => {
  try {
    const evt = await verifyWebhook(req);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const name =
        [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" ") ||
        null;

      const email =
        evt.data.email_addresses.find(
          (e) => e.id === evt.data.primary_email_address_id
        )?.email_address ??
        evt.data.email_addresses[0]?.email_address ??
        null;

      if (!email) return res.status(400).send("Missing email");

      const user = await upsertUser({
        clerkId: evt.data.id,
        email,
        name,
        imageUrl: evt.data.image_url,
        role: evt.data.public_metadata.role || "user",
      });

      if (evt.type === "user.created") {
        await syncClerkMetaData(evt.data.id, user);
      }
    } else if (evt.type === "user.deleted") {
      if (!evt.data.id) return res.status(400).send("Missing user ID");
      await deleteUser(evt.data.id);
    }

    return res.send("Webhook received");
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Error verifying webhook");
  }
};
export default handleClerkWebhook;
