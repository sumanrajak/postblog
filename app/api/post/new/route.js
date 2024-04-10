import Post from "@models/post"
import { connectToDb } from "@utils/database"

export const POST = async (req, res) => {
    const { caption, imageUrl, tags, userId } = await req.json()
    let comments = ''
    try {
        await connectToDb()
        const newPost = new Post({
            creator: userId,
            caption, imageUrl, tags, comments
        })
        await newPost.save()
        return new Response(JSON.stringify(newPost), {
            status: 201
        })

    } catch (error) {
        return new Response("surver error faild to creat enew post"+error, {
            status: 500
        })
    }
}