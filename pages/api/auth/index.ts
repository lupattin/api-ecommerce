import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { findOrCreateAuth } from '../../../controllers/auth';
import * as yup from "yup"

let bodySchema = yup.object().shape({
  email: yup.string().required(),
  name: yup.string()
}).noUnknown().strict()



export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {

    try {
      await bodySchema.validate(req.body)
      try {
        await findOrCreateAuth(req.body.email, req.body.name)
        res.status(200).send("Codigo enviado correctamente")
        
      } catch (error) {
        res.status(500).send("Hubo un error, por favor, intentar mas tarde")
      }
    } catch (error) {
      res.status(422).send({field:"body", error})
    }
    
  }
})