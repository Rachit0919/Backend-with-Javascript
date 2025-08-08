import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    const allComments = await Comment.aggregate([
        {
            $match: {
                video: videoId, 
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "commentOwner",
                pipeline:[
                    {
                        $project:{
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                commentOwner:{
                    $first: "$commentOwner"
                }
            }
        },
        {
            $project:{
                content: 1,
                commentOwner,
                createdAt: 1,
                updatedAt: 1
            }
        }
        
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allComments,
            "Fetched all comments of a video succesfully"
        )
    )
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {userID} = req.user
    const {content} = req.body

    if(!content){
        throw new ApiError(400, "Content cannot be posted empty")
    }
    if (!videoId) {
        throw new ApiError(400, "VideoId is neccessary")
    }
    if (!userID) {
        throw new ApiError(401, "UserId is neccessary")
    }

    const{ fullName, username , avatar} = req.user

    await Comment.create({
        content,
        video: videoId,
        owner: userID
    })
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                content,
                fullName,
                username,
                avatar
            },
            "Comment added successfully in MongoDB"
            

        )
    )



})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }