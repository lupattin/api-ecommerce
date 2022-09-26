import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from './jwt';
import { User } from '../models/user';
import Cors from 'cors'
export function authMiddleware(callback): Function{
    return async function (req: NextApiRequest, res:NextApiResponse){
      
      
      if(!req.headers.authorization){
        res.status(401).send("No token sended")
      }

       const token = req.headers.authorization.split(` `)[1]
       
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

  const cors = Cors({
    methods: ['POST', 'GET', 'HEAD', "OPTIONS"],
  })

  export function runCorsMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
  ) {
    return new Promise((resolve, reject) => {
      cors(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result)
        }
        fn(req, res)
        return resolve(result)
      })
    })
  }

