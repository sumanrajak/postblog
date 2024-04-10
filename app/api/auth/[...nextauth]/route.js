

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import User from "@models/user"
import { connectToDb } from "@utils/database"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async signIn({ profile }) {
            try {
                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                // console.log(userExists);
                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        },
        async session({ session }) {
            try {
                await connectToDb()
                const sessionUser = await User.findOne({
                    email: session.user.email
                })
                session.user.id = sessionUser?._id.toString();
            } catch (error) {
                console.log(error);
            }
           
            return session;
        }
    }
   
})

export { handler as GET, handler as POST }