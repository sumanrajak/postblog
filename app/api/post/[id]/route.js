import { connectToDb } from '@utils/database';
import Post from '@models/Post';


export const GET = async (request,{params}) => {
    try {
        await connectToDb();
        const post = await Post.findById(params.id).populate('creator');
        if(!post){ return new Response("post dosent exist", {
            status: 404
        })}
        return new Response(JSON.stringify(post), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("error loading post" + error, {
            status: 500
        })
    }
}

export const PATCH = async (req, {params}) => {
    const { caption, tags } = await req.json()
    try {
        await connectToDb()
        const post = await Post.findById(params.id);
        if(!post)return new Response("post dosent exist", {
            status: 404
        })
        post.caption=caption
        post.tags=tags
        await post.save()
        return new Response(JSON.stringify(post), {
            status: 201
        })

    } catch (error) {
        return new Response("surver error faild to creat enew post"+error, {
            status: 500
        })
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDb()
        const post = await Post.findByIdAndDelete(params.id);
        
        return new Response("delete success", {
            status: 201
        })

    } catch (error) {
        return new Response("surver error faild to creat enew post"+error, {
            status: 500
        })
    }
}