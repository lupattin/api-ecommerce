import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getMerchantOrder } from "../../../lib/mercadopago";
import { orderChange } from "../../../controllers/mercadopago";
import { runCorsMiddleware } from "../../../lib/middlewares";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id, topic } = req.query;

  if (topic == "merchant_order") {
    const order = await getMerchantOrder(id);
    if (order.body.order_status) {
      await orderChange(id);
    }
  }
  res.send("ok");
}

const handler = methods({
  post: postHandler,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, handler);
};
