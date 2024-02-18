// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// export const createDude = async (name: string,
//     email: string,
//     hashedPassword: string,
//     address: string,
//     phone: string,
//     score:number,
//     picture:string ) => {

//         const output = await prisma.user.create({
//             data : {
//                 name,
//                 email,
//                 hashedPassword,
//                 address,
//                 phone,
//                 score,
//                 picture,
//             }
//         })

//         return output;
// }

// export const searchUser = async (inputName: string,
//     password: string) => {

//         const output = await prisma.user.findFirst({
//             where : {
//                 name : inputName,
//                 hashedPassword : password
//             }
//         })

//         return output;
// }

// export const createTestUser = async (inputName: string,
//     password: string) => {

//         const output = await prisma.user.create({
//             data : {
//                 name : inputName,
//                 email : "x",
//                 hashedPassword : password,
//                 address :"x",
//                 phone:"x",
//                 score:0 ,
//                 picture :"x",
//             }
//         })

//         return output;
// }