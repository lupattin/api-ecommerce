import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { authMiddleware } from "../../../lib/middlewares";
import {User} from "../../../models/user"
import {updateUser} from "../../../controllers/user"
import * as yup from "yup"

let bodySchema = yup.object().shape({
  address: yup.string().required()
}).noUnknown().strict()

async function patchHandler(req: NextApiRequest, res: NextApiResponse, userData:User){
  try {
    await bodySchema.validate(req.body)
  } catch (error) {
    res.status(422).send({field:"body", error})
  }
  const result = await updateUser(userData, req.body)
  res.send(result)
}

const handler = methods({
  patch: patchHandler
})

export default authMiddleware(handler);