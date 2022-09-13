import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from './jwt';
import { User } from '../models/user';

export function authMiddleware(callback): Function{
    return async function (req: NextApiRequest, res:NextApiResponse){
      
      
      if(!req.headers.authorization){
        res.status(401).send("No token sended")
      }

       const token = req.headers.authorization.split(`"`)[1]
       const decoded = decodeToken(token) as any
  
       if(decoded){
        const userData = new User(decoded.id)
        await userData.pull()
        
        callback(req, res, userData)

       }else{
        res.status(401).send("Incorrect Token")
       }
    }
  }