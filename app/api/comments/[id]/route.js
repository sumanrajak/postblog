import { connectToDb } from '@utils/database';
import Post from '@models/post';


export const GET = async (request,{params}) => {
    try {
        await connectToDb();
        const post = await Post.findById(params.id).populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'user',
                model: 'User'
            }
        });;
        if(!post){ return new Response("post dosent exist", {
            status: 404
        })}
        return new Response(JSON.stringify(post.comments), {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return new Response("error loading post" + error, {
            status: 500
        })
    }
}