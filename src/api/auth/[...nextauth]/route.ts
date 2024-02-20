import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prismaDB";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Credentials from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
    adapter : PrismaAdapter(prisma),
    providers: [
        // Credentials({
        //     name:"credentials",
        //     credentials:{},
        //     async authorize(credentials) {
        //         const {username,password} = credentials as {
        //             username:string,
        //             password:string
        //         }
        //         let user;
        //         try {
        //             user = await prisma.user.findFirst({
        //                 where:{
        //                     name:username,
        //                 }
        //             })
        //         } catch (error) {
        //             console.log(error)
        //         }

        //         return user?.name
        //     }
        // })
    ]
}

const handler = NextAuth(authOptions);

export {handler as GET,handler as POST};
