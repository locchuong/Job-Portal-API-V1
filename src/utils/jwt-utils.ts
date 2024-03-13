import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";

import configs from "@/configs";
import { IUser } from "@/features/users/users.interface";

/**
 * Generates a random salt.
 * @returns A randomly generated salt.
 */
function generateSalt() {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Generates a hash for the given password and salt.
 * @param password - The password to generate the hash for.
 * @param salt - The salt to use for hashing.
 * @returns The generated hash.
 */
function generateHash(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
}

/**
 * Generates a salt and hash for the given password.
 * @param password - The password to generate the salt and hash for.
 * @returns An object containing the salt and hash.
 */
function generatePassword(password: string) {
  const salt = generateSalt();
  const hash = generateHash(password, salt);

  return {
    salt,
    hash,
  };
}

/**
 * Generates a JSON Web Token (JWT) for the given user.
 * @param user - The user object to generate the JWT for.
 * @returns The generated JWT.
 */
function issueJWT(user: IUser) {
  const payload = {
    sub: user._id,
    iat: Date.now(),
  };

  const token = jsonwebtoken.sign(payload, configs.jwt.privKey, {
    expiresIn: configs.jwt.expiresIn,
    algorithm: configs.jwt.algorithm as jsonwebtoken.Algorithm,
  });

  return token;
}

/**
 * Validates a password by comparing the provided password, hash, and salt.
 * @param password - The password to validate.
 * @param hash - The hash to compare against.
 * @param salt - The salt used to generate the hash.
 * @returns True if the password is valid, false otherwise.
 */
function validatePassword(password: string, hash: string, salt: string) {
  const hashVerify = generateHash(password, salt);
  return hash === hashVerify;
}

export default {
  issueJWT,
  generatePassword,
  validatePassword,
};
