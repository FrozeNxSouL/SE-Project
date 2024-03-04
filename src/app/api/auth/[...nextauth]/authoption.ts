import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prismaDB";

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password"}
            },

            async authorize(credentials) {
                console.log(credentials)
                if (!credentials?.email || !credentials?.password) {
                    console.log("wow1")
                    throw new Error("email and password is required")
                }
                const res = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!res) {
                    throw new Error("wow2");
                }
                
                const user = await compare(credentials.password, res.hashedPassword).then((result) => {
                    if (!result) {
                        throw new Error("email or password is invalid")
                    } else {
                        return res
                    }
                });
                return user;      
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}