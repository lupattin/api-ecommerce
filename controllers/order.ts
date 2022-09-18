import { Order } from "../models/order";
import { createPreference } from "../lib/mercadopago";

export async function createOrder(aditionalInfo, productID, userID) {
  try {
    const newOrder = await Order.createNewOrder({
      aditionalInfo,
      productID,
      userID,
    });
    return newOrder;
  } catch (error) {
    return error;
  }
}

export async function createNewPreference(productData, external_reference) {
  try {
    const newPreference = await createPreference({
      external_reference,
      notification_url:
        "https://api-ecommerce-roan.vercel.app/api/ipn/mercadopago",

      items: [
        {
          title: productData.Name,
          description: productData.description,
          picture_url: productData.Images.url,
          category_id: productData.Type,
          quantity: 1,
          currency_id: "ARS",
          unit_price: productData["Unit cost"],
        },
      ],

      back_urls: {
        success: "http://apx.school",
      },
    });
    return newPreference;
  } catch (error) {
    return error;
  }
}
