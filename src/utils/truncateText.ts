export const truncateText = (str: string) => {
    if (str.length <= 50) return str; // Return the original string if its length is less than or equal to 25

    return str.substring(0, 50) + '...'; // Truncate the string if its length is greater than 25
};
