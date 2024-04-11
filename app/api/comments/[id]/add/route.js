

import { connectToDb } from '@utils/database';
import Post from '@models/Post';
import Comment from '@models/comments';

import mongoose from "mongoose";

export const POST = async (request,{params}) => {
    const { text,  userId } = await request.json()

    try {
        await connectToDb();
        const post = await Post.findById(params.id)
        if(!post){ return new Response("post dosent exist", {
            status: 404
        })}

        const comment = new Comment({
            user: userId,
            text,
        });
       

        await comment.save();

        post.comments.push(comment._id);

        await post.save();
        return new Response(JSON.stringify(post), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("error creating comments" + error, {
            status: 500
        })
    }
}

