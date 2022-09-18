import { firestore } from "../db/firestore";

const collection = firestore.collection("orders");
export class Order {
  ref: FirebaseFirestore.DocumentReference;
  id: string
  data: any;
  constructor(id) {
    this.id = id
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push(){
    this.ref.update(this.data)
  }
  static async createNewOrder(data={}){
    const newOrderSnap = await collection.add(data);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = data
    newOrder.data.createdAt = new Date()
    newOrder.data.paymentStatus = "Pending"
    newOrder.push()
    
    return newOrder;

  }
  static async getOrdersFromOneUser(userID){
   const result = await (await collection.where("userID", "==", userID).get()).docs
   return result
  }

  static async getOrderByID(id){
    const ref = await collection.doc(id)
    const result = await ref.get()
    return result.data()
  }
}