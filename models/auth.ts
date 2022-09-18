import { firestore } from "../db/firestore";

const collection = firestore.collection("auth");
export class Auth {

  ref: FirebaseFirestore.DocumentReference;
  data: any;

  constructor(id) {
    this.ref = collection.doc(id);
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push(){
    this.ref.update(this.data)
  }

  static async findByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    const results = await collection.where("email", "==", cleanEmail).get();

    if (results.docs.length) {

      const newAuth = new Auth(results.docs[0].id);
      newAuth.data = results.docs[0].data();

      return newAuth;

    } else {
      return null;
    }
  }
  static async createNewAuth(data){

    const newAuthSnap = await collection.add(data)
    const newAuth = new Auth(newAuthSnap.id)
    newAuth.data = data

    return newAuth
  }
}
