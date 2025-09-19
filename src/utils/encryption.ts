import { AES, enc } from "crypto-js";

class SecureStorage {
  private readonly KEY = process.env.REACT_APP_STORAGE_KEY;

  setItem(key: string, value: any) {
    try {
      const encrypted = AES.encrypt(JSON.stringify(value), this.KEY).toString();
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
      throw new Error("Failed to store data securely");
    }
  }

  getItem(key: string) {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;

      const decrypted = AES.decrypt(encrypted, this.KEY);
      return JSON.parse(decrypted.toString(enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }
}

export const encryptStorage = new SecureStorage();
