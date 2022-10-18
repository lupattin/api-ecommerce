import { Product } from "../models/product"

export async function getProductByID(id:string) {
    try {
               
        const product = new Product(id)
        const result = await product.getdata()
       
        return result
    } catch (error) {
        throw error
    }
}
export async function getFeaturedProducts() {
    try {
               
          const result = await Product.getAllProducts()
            console.log(result);
            
        return result
    } catch (error) {
        throw error
    }
}