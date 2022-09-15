import { algoliaIndex } from "../db/algolia";

export async function searchProductsAlgolia(query: string, offset:number, length:number) {
    try {
        
        const result = await algoliaIndex.search(query as string, {
            offset,
            length
        })
        return result
    } catch (error) {
        throw error
    }
}