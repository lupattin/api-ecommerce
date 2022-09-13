import test from "ava";
import { generateToken, decodeToken } from "./jwt";

test("jwt encode/decode", (t) => {
  const objectTest = { id: 1234 };
  const token = generateToken(objectTest);

  const decode = decodeToken(token) as any;

  delete decode.iat;
  t.deepEqual(objectTest, decode);
});
