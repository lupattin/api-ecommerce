import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { findOrCreateAuth } from '../../../controllers/auth';



export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    try {
      const result = await findOrCreateAuth(req.body.email)
      res.status(200).send("Codigo enviado correctamente")
      
    } catch (error) {
      res.status(500).send("Hubo un error, por favor, intentar mas tarde")
    }
    
  }
})