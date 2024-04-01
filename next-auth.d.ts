import { Role } from "@prisma/client";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined
      name: string
      email: string
      phone: string
      picture: string
      score: Float
      role: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {

  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string

  }
}