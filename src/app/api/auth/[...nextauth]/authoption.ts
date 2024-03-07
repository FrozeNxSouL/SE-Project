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
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("email and password is required")
                }
                const res = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!res) {
                    throw new Error("email or password is invalid");
                }
                
                const user = await compare(credentials.password, res.hashedPassword).then((result) => {
                    if (!result) {
                        throw new Error("email or password is invalid")
                    } else {
                        return res
                    }
                });
                return {
                    id: user.id,
                    name: user.name,
                    image: user.picture,
                    email: user.email,
                }
                               
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            user: {
            ...session.user,
            id: token.sub,
            },
        }),
    },
    pages: {
        signIn: '/auth/login',
    }
}