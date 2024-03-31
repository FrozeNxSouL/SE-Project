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

                // if (!passwordValid) {
                //     throw new Error("email or password is invalid");
                // }

                // Return an object with the required properties
                return user
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            const user = await prisma.user.findUnique({
                where: {
                    id: token.sub,
                },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    email: true,
                    phone: true,
                    picture: true,
                    score: true,
                    role: true,
                    auction: true,
                    product: true,
                    transactions: true,
                    report: true,
                    wallet: true,
                }
            });
    
            // Check if user is null or undefined
            if (!user) {
                // Handle the case where user is not found
                throw new Error("User not found");
            }
    
            // Assign user properties to session.user
            session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                // Add other properties here as needed
            };
    
            return session;
        },
    },
    pages: {
        signIn: '/auth/login',
    }
};
