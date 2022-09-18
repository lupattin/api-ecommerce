import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { getProductByID } from '../../../controllers/product';

export default methods({
  async get(req: NextApiRequest, res:NextApiResponse) {

    try {
      const result = await getProductByID(req.query.id as string)
      res.status(200).send(result)
      
    } catch (error) {
      res.send(error.message)
    }
  }
})