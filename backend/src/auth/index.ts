import { TokenInfo } from './../model/Token';
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

export const verifyToken = (token: string): TokenInfo | object => {
    let decodedAccount: TokenInfo | string | object;
    if (!token) { throw new Error(UNAUTHORIZED_ERROR); }
    try {
        decodedAccount = jwt.verify(token, process.env.JWT_SECRET || "") as TokenInfo;
    } catch (e) {
        throw new Error(UNAUTHORIZED_ERROR);
    }
    return decodedAccount;
};

