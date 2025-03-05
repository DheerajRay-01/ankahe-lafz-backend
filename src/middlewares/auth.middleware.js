import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandeler.js";
import jwt from 'jsonwebtoken'

export const JWTverify = asyncHandler(async(req, _, next)=>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     console.log("token:", token);
 
     if(!token){
         throw new apiError(401,"verify JWT error, Unauthorized request")
     }
 
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    //  console.log("decoded token :",decodedToken);
     
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     console.log(user);
     
 
     if(!user){
         throw new apiError(400,"Invalid Access Token")
     }
 
     req.user = user
 
     next()
   } catch (error) {
    throw new apiError(401, error?.message || "Invalid access token")
   }
})