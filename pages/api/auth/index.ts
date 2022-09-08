import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { firestore } from '../../../lib/firestore';

export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {

    const newUser = await firestore.collection("auth").add({
        email: "prueba"
    })
    res.send( newUser)
  }
})