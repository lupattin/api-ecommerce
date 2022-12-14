import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware, runCorsMiddleware } from "../../../lib/middlewares";
import { User } from "../../../models/user";
import {getOrdersFromUser} from "../../../controllers/order"



async function getHandler(req: NextApiRequest, res: NextApiResponse, userData:User) {
    try {
        const result = await getOrdersFromUser(userData.id)
      res.status(200).send(result);
        
    } catch (error) {
        res.status(500).send(error)
    }
}


const handler = methods({
  get: getHandler,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, authMiddleware(handler));
};
