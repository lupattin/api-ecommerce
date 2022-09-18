import { getMerchantOrder } from "../lib/mercadopago";
import { Order } from "../models/order";

export async function orderChange(id) {
  const order = await getMerchantOrder(id);

  if (order.body.order_status == "paid") {
    const orderID = order.body.external_reference;

    const orderReference = new Order(orderID);
    await orderReference.pull();
    orderReference.data.paymentStatus = "closed";
    await orderReference.push();
  }
  return "ok"
}
