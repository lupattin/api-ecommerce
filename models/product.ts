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
}
