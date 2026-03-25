import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'philosophid-super-secret-key-2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface CustomJWTPayload {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
  isRegistered?: boolean;
}

/**
 * Signs a custom JWT using the secret and expiration time defined in .env
 */
export function signCustomToken(payload: CustomJWTPayload): string {
  // @ts-ignore: to fix type error for StringValue
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a custom JWT and returns the decoded payload.
 * Throws an error if the token is invalid or expired.
 */
export function verifyCustomToken(token: string): CustomJWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJWTPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired custom token');
  }
}
