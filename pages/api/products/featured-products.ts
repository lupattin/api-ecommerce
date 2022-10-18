import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { getFeaturedProducts } from '../../../controllers/product';
import { runCorsMiddleware } from "../../../lib/middlewares";


async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await getFeaturedProducts()
    res.status(200).send(result)
    
  } catch (error) {
    res.send(error.message)
  }
}

const handler = methods({
  get: getHandler,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runCorsMiddleware(req, res, handler);
};