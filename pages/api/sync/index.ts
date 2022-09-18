import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { syncAlgoliaFromAirtable } from '../../../controllers/sync';

export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    const result = await syncAlgoliaFromAirtable()
  res.send(result)
  }
})