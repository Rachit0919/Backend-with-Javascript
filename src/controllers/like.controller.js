import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {Video} from "../models/video.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params   // from url
    if (!videoId ) {
        throw new ApiError(400, "Invalid video ID")
    }

    const {userId} = req.user  // from middleware
    if (!userId) {
        throw new ApiError(401, "Please log in to like videos")
    }

    const updatedVideoLike = await Like.findOneAndUpdate(
        {
            video: videoId,
            likedBy: userId
        },
        [
            {
                $set:{
                    video: videoId,
                    likedBy: userId,
                    isLiked: {
                        $not: ["$isLiked"]
                    },
                    toggledAt: new Date()
                }
            }
        ],
        {
            upsert:true,
            new: true
        }

    )
    const message = updatedVideoLike.isLiked? "User liked the video": "User unliked the video"

    
    //  this approach is also correct but call db two time just for one action

    // const hasUserLikedTheVideo = await Like.findOne({
    //     video: videoId,
    //     likedBy: userId
    // })

    // if (!hasUserLikedTheVideo) {
    //     await Like.create({
    //         video: videoId,
    //         likedBy: userId
    //     }
    // )
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            message,
            updatedVideoLike
        )
    )
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if (!commentId) {
        throw new ApiError(401, "Invalid comment Id")
    }
    const {userId} = req.user
    if (!userId) {
        throw new ApiError()
    }


})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}