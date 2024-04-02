"use server"

const filter: string[] = [];
const validInputRegex = /^[a-zA-Z0-9_\u0E00-\u0E7F\s]*$/;

export async function validateName(str: string) {
    filter.forEach(word => {
        if (str.includes(word)) {
            throw new Error("This name includes a banned word");
        }
    });

    if (str.length > 32) {
        throw new Error("Name can't be longer than 32 characters")
    }

    if (!validInputRegex.test(str)) {
        throw new Error("Only the letter, number, and underscore are allowed.")
    }
}