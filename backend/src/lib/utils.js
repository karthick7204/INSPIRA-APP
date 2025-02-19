import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
   const token = jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d"
   })

   res.Cookie("jwt",token, {
    maxAge: 7 * 24 * 60 *60 *1000,
    httpOnly: true,// prevent xss attacks cross site scripting attack
    sameSite:"strict",// csrf attack cross site request forgery attacks
    secure:process.env.NODE_ENV !== "development",
   });
   return token;
};