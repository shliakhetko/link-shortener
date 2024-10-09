import * as bcrypt from 'bcrypt';

// Define the number of salt rounds for hashing
const SALT_ROUNDS = 10;

/**
 * Hash a plain text password
 * @param plainPassword - The password to be hashed
 * @returns A Promise that resolves to the hashed password
 */
export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
};

/**
 * Compare a plain text password with a hashed password
 * @param plainPassword - The plain text password to compare
 * @param hashedPassword - The hashed password to compare against
 * @returns A Promise that resolves to a boolean indicating if the passwords match
 */
export const comparePasswords = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};