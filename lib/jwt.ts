import jwt from "jsonwebtoken";

export function generateToken(authData) {
  const token = jwt.sign({ id: authData.id }, process.env.JWT_SECRET);
  return token;
}

export function decodeToken(token) {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (error) {
    console.log("token Incorrecto");
    return null;
  }
}
