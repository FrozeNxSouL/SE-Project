import { User } from "@prisma/client";

export type SafeUser = Omit<User,"email"|"hashedPassword"> &{
    email: string;
    hashedPassword: string;
};