import { connectToDb } from '@utils/database';
import User from '@models/user';
export const GET = async (request) => {
    try {
        await connectToDb();
        const users = await User.find()
        return new Response(JSON.stringify(users), {
            status: 200
        })
    } catch (error) {
        return new Response("error loading users" + error, {
            status: 500
        })
    }
}