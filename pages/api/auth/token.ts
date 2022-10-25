import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { checkCode } from '../../../controllers/auth';
import * as yup from "yup"
import { runCorsMiddleware } from "../../../lib/middlewares";

let bodySchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().required()
}).noUnknown().strict()

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await bodySchema.validate(req.body)
    const result = await checkCode(req.body.email, req.body.code)
    
    if(result == false){

      res.status(401).send({message:"Incorrect code or expired."})
    }else{
      res.status(200).send({token: result})
    }
    
  } catch (error) {
    
    res.status(422).send({field:"body", error})
  }
}
const handler = methods({
  post: postHandler,
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, handler);
};