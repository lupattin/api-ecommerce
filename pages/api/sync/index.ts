import { NextApiRequest, NextApiResponse } from 'next';
import methods from "micro-method-router"
import { airtableBase } from '../../../db/airtable';
import { algoliaIndex } from '../../../db/algolia';

export default methods({
  async post(req: NextApiRequest, res:NextApiResponse) {
    airtableBase('Furniture').select({}).eachPage( async function page(records, fetchNextPage) {
      const objects = records.map((record)=>{
        return {
          objectID: record.id,
          ...record.fields
        }
      });
      await algoliaIndex.saveObjects(objects)
      fetchNextPage();

      
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
  res.send("Airtable successfully updated")
  }
})