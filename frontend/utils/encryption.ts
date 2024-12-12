import CryptoJS from "crypto-js";

export const encryptAES = (text: string, key: string): string => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptAES = (ciphertext: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
