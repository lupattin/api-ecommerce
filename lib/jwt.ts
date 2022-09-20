import jwt from "jsonwebtoken";

export function generateToken(authData):string {
  const token = jwt.sign({ id: authData.id }, process.env.JWT_SECRET);
  return token;
}

export function decodeToken(token):string | jwt.JwtPayload {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  } catch (error) {
    
    return null;
  }
}
