import { User } from "../models/user";
import { Auth } from "../models/auth";
import addMinutes from "date-fns/addMinutes";
import isFuture from "date-fns/isFuture";
import gen from "random-seed";
import { sendMail } from "../lib/sendgrid";
import { generateToken } from "../lib/jwt";

const randomNumber = gen.create();

export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const auth = await Auth.findByEmail(cleanEmail);

    if (auth) {
      const code = randomNumber.intBetween(10000, 99999);

      const dateNow = new Date();
      const twentyMinutesExpire = addMinutes(dateNow, 20);

      auth.data.code = code;
      auth.data.expire = twentyMinutesExpire;

      await auth.push();
      await sendMail(email, code);

      return auth.data;
    } else {
      const code = randomNumber.intBetween(10000, 99999);

      const dateNow = new Date();
      const twentyMinutesExpire = addMinutes(dateNow, 20);

      const newUser = await User.createNewUser({ email });
      const newAuth = await Auth.createNewAuth({
        email,
        id: newUser.id,
        code,
        expire: twentyMinutesExpire,
      });

      await sendMail(email, code);

      return newAuth.data;
    }
  } catch (error) {
    return error;
  }
}

export async function checkCode(email: string, code: number): Promise<String | Boolean> {
  try {
    const result = await Auth.findByEmail(email);
    const authData = result.data;
    if (code == authData.code && isFuture(authData.expire.toDate())) {
      const token = generateToken(authData);
      return token;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
