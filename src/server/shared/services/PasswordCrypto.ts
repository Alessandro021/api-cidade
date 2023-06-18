import { genSalt, hash, compare } from "bcryptjs";


const SALT_RANDOMS = 10;

const hashPassword = async (password: string) => {

  const saltGenerated = await genSalt(SALT_RANDOMS);

  const hashPass = await hash(password, saltGenerated);

  return hashPass;
};

const verifyPassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
};


export const PasswordCrypto = {
  hashPassword,
  verifyPassword,
};