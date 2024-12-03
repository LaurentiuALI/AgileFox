import Cryptr from "cryptr";

export function encrypt(text: string) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret !== undefined) {
    const cryptr = new Cryptr(secret);
    return cryptr.encrypt(text);
  }
}

export function decrypt(text: string) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret !== undefined) {
    const cryptr = new Cryptr(secret);
    return cryptr.decrypt(text);
  }
}
