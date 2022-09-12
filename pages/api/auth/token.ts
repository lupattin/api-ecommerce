import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { checkCode } from '../../../controllers/auth';




export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    
    const result = await checkCode(req.body.email, req.body.code)
    
    if(result == false){

      res.status(401).send("Incorrect code or expired.")
    }else{
      res.status(200).send(result)
    }
  }
})