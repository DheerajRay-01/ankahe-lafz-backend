import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

const options = {
    httpOnly: true,
    secure: true
}


const generateTokens =async (userId)=>{
try {
    const user =await User.findById(userId)
    if(!user){
        throw new apiError(401, "token Generate Error")
    }
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    
    if(!accessToken || !refreshToken){
        throw new apiError(401, "token not generated")
    }
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave:false})
    
    return {accessToken,refreshToken}
} catch (error) {
    throw new apiError(500,"Error while generating tokens")
}
}

const registerUser = asyncHandler( async(req ,res)=>{
    // console.log("test register", req.body);
    const {fullname, username, email, password} = req.body
    if(!fullname || !username || !email || !password){
        throw new apiError(401, "All fields Required")
    }
    
     
    const alreadyUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(alreadyUser){
        throw new apiError(401,"user with name username or email is already exist")
    }

    const newUser = await User.create({
        username,
        email,
        password,
        fullname
    })
    if(!newUser){
        throw new apiError(401,"user not created")
    }

    return res.status(200)
    .json(new apiResponse(200,newUser,"user created Successfully"))
})


const loginUser = asyncHandler(async(req,res)=>{    
    const {email, password} = req.body
    if( !email || !password){
        throw new apiError(401, "All fields Required")
    }
    
    const user = await User.findOne({email})
    
    
    if(!user){
        throw new apiError(401,"user with email is not exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new apiError(401,"Incorrect Password")
    }

    const {accessToken,refreshToken} =await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
    // return res.send(accessToken)
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new apiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})


const userLogout = asyncHandler(async(req, res)=>{
    // console.log(req);
    const user = req.user
    await User.findByIdAndUpdate(
        user._id,
        {
            $unset:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )


    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(
        200,
        {},
        "user loggedOut successfully")
    )
})


const getCurrentUser = asyncHandler(async(req, res)=>{
    console.log(req);
    const user = req.user
    console.log("getCurrentUser :",user);
    
    if(!user){
        throw new apiError(400,"cant get current user")
    }
    res.status(200)
    .json(new apiResponse(
        200,
        {user},
        "current user fetched")
    )
})


export{
    registerUser,
    loginUser,
    userLogout,
    getCurrentUser
}