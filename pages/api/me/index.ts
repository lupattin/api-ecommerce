import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authMiddleware, runCorsMiddleware } from "../../../lib/middlewares";
import { User } from "../../../models/user";
import { updateUser } from "../../../controllers/user";
import * as yup from "yup"



let bodySchema = yup.object().shape({
  email: yup.string(),
  name: yup.string(),
  address: yup.string()
}).noUnknown()


function getHandler(req: NextApiRequest, res: NextApiResponse, userData:User) {
  res.status(200).send(userData.data);
}

async function patchHandler(req: NextApiRequest, res: NextApiResponse, userData:User){
  try {
    await bodySchema.validate(req.body)
    
    const result = await updateUser(userData, req.body)
    res.send(result)

  } catch (error) {
    res.status(422).send({field:"body", error})
  }
}

const handler = methods({
  get: getHandler,
  patch: patchHandler
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, authMiddleware(handler));
};
