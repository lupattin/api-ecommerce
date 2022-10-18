import { algoliaIndex } from "../db/algolia";

export class Product {
  id: string
  data: any;
  constructor(id) {
    this.id = id
  }
  async getdata(){
   return algoliaIndex.getObject(this.id)
  }
  static async getAllProducts(){
    let hits = [];
    const prueba = await algoliaIndex.browseObjects({
      batch: batch => {
        hits = hits.concat(batch);
      }
    })

    return [hits[0], hits[1], hits[2]]
    
  }
}
