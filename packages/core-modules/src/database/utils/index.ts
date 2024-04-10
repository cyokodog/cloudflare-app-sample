// For DB id generation
export { ulid } from 'ulidx';

const encoder = new TextEncoder();
export const toHashDigest = async (message: string, salt: string) => {
  const msgUint8 = encoder.encode(`${message}::${salt}`);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};
