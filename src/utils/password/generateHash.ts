import { createHash } from "crypto";

export function generateHash(password: string): string {
    const hash = createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}