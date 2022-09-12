import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware } from "../../../lib/middlewares";
import { User } from "../../../models/user";

function getHandler(req: NextApiRequest, res: NextApiResponse, userData:User) {
  res.status(200).send(userData);
}

const handler = methods({
  get: getHandler
})

export default authMiddleware(handler);
