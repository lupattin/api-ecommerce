import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "../../../lib/middlewares";
import { User } from "../../../models/user";
import {getOrderByID} from "../../../controllers/order"


async function getHandler(req: NextApiRequest, res: NextApiResponse, userData:User) {
    try {
        const result = await getOrderByID(req.query.orderID)
      res.status(200).send(result);
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const handler = methods({
  get: getHandler,
})

export default authMiddleware(handler);
