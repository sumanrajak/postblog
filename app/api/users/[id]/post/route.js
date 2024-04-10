import { connectToDb } from '@utils/database';
import Post from '@models/Post';
export const GET = async (request,{params}) => {
    try {
        await connectToDb();
        const prompts = await Post.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("error loading post" + error, {
            status: 500
        })
    }
}