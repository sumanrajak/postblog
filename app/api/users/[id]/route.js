import User from '@models/user';
import { connectToDb } from '@utils/database';

export const GET = async (request,{params}) => {
    try {
        await connectToDb();
        
        
        const user = await User.findById(params.id);
        
        if (!user) {
            // If user is not found, return appropriate response
            return new Response("User not found", {
                status: 404
            });
        }
        
        // If user is found, return the user object
        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (error) {

        return new Response("Error loading user: " + error.message, {
            status: 500
        });
    }
}
