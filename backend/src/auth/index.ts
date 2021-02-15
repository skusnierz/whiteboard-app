import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UNAUTHORIZED_ERROR: string = "Unauthorized";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const createToken = (email: string, username: string): string => {
    return jwt.sign({ email, username }, process.env.JWT_SECRET || "", { expiresIn: process.env.TOKEN_EXPIRE_TIME || "3d" });
};

export const verifyToken = (token: string): any => {
    let decodedAccount;
    if (!token || token === "null") { return null; }
    try {
        decodedAccount = jwt.verify(token, process.env.JWT_SECRET || "");
    } catch (e) {
        throw new Error(UNAUTHORIZED_ERROR);
    }
    return decodedAccount;
};

