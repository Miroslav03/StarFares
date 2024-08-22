import bcrypt from "bcrypt";

export class Password {
    static async toHash(password: string) {
        const hashedPassword = await bcrypt.hash(password, 12);
        return hashedPassword;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        return await bcrypt.compare(suppliedPassword, storedPassword);
    }
}
