import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { checkCode } from '../../../controllers/auth';
import * as yup from "yup"

let bodySchema = yup.object().shape({
  email: yup.string().required(),
  code: yup.number().required()
}).noUnknown().strict()


export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    
    const result = await checkCode(req.body.email, req.body.code)
    try {
      await bodySchema.validate(req.body)
    } catch (error) {
      res.status(422).send({field:"body", error})
    }
    if(result == false){

      res.status(401).send("Incorrect code or expired.")
    }else{
      res.status(200).send(result)
    }
  }
})