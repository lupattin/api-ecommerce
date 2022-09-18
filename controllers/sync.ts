import { airtableBase } from '../db/airtable';
import { algoliaIndex } from "../db/algolia";


export async function syncAlgoliaFromAirtable(){

    airtableBase('Furniture').select({}).eachPage( async function page(records, fetchNextPage) {
        const objects = records.map((record)=>{
          return {
            objectID: record.id,
            ...record.fields
          }
        });
        await algoliaIndex.saveObjects(objects)
        fetchNextPage();
        return "Sync Finish"
        
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}