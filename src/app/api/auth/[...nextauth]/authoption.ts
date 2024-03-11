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
                    throw new Error("email and password are required");
                }
                
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                });

                if (!user) {
                    throw new Error("email or password is invalid");
                }

                const passwordValid = await compare(credentials.password, user.hashedPassword);

                if (!passwordValid) {
                    throw new Error("email or password is invalid");
                }

                // Return an object with the required properties
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.picture,
                };
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
};
