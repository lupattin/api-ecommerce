import { User } from "../models/user";

export async function updateUser(user:User, newData){
    try {
        user.data = newData
        await user.push()
        return "User updated successfully"
        
    } catch (error) {
        throw error
    }
}