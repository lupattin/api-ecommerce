import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { getMerchantOrder } from '../../../lib/mercadopago';
import {orderChange} from "../../../controllers/mercadopago"

export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    const {id, topic} = req.query;

    if(topic == "merchant_order"){
      
      
      const order = await getMerchantOrder(id);
      if(order.body.order_status){
        await orderChange(id)
        
      }
    }
   res.send("ok")
  }
})