import { Content } from "../models/content.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

const addContent = asyncHandler(async(req,res)=>{
    const {content , language } = req.body

    // console.log(req.user);
    
// console.log(req.user?._id);

    if(!content || !language ){
        throw new apiError(400, "All fields are require for save")
    }

        if (!req.user || !req.user._id) {
            throw new apiError(401, "Unauthorized: User not found");
        }

       const owner = req.user?._id

   if(!owner){
    throw new apiError(400, "user not found for upload")
   }

   const uploadedContent = await Content.create({
    content,
    language,
    owner
   })

   if(!uploadedContent){
    throw new apiError(400, "Error while uploading")
   }

   return res.status(201)
   .json(new apiResponse(
    201,
    {
        content:uploadedContent
    },
    "Uploading Successfully"
   ))
    // Content.findByi
})

const getAllContent = asyncHandler(async(req,res)=>{
    const owner = req.user?._id
    if(!owner){
        throw new apiError(401, "Unauthorized: User not found");
    }

    const allContent = await Content.find({owner})
    console.log("addContent :",addContent);
    

    if (!allContent.length) {
        throw new apiError(404, "No content found for this user");
    }


   return res.status(200)
   .json(new apiResponse(
    200,
    {allContent},
    "Fetched Successfully"
   ))
})


export {
    addContent,
    getAllContent
}