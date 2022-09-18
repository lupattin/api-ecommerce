import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "../../../lib/middlewares";
import { User } from "../../../models/user";
import { getProductByID } from "../../../controllers/product";
import {createOrder} from "../../../controllers/order"
import {createNewPreference} from "../../../controllers/order"

async function postHandler(req: NextApiRequest, res: NextApiResponse, userData: User) {
  try {
    const result = await getProductByID(req.query.productID as string) as any;

    const newOrder = await createOrder(req.body, result.objectID, userData.id)
       
    const newPreference= await createNewPreference(result, newOrder.id) 

    res.status(200).send({
      url: newPreference.body.init_point
    });
  } catch (error) {
    res.send("ProductID does not match any product");
  }
}

const handler = methods({
  post: postHandler,
});

export default authMiddleware(handler);
