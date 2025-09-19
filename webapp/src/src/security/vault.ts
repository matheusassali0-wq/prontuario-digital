import { argon2id } from 'hash-wasm';
import { AES, enc } from 'crypto-js';

export class SecureVault {
  private key: CryptoKey | null = null;
  private readonly SALT = 'quantum-secure-vault-2024';

  async initialize(masterPassword: string) {
    // Derivar chave usando Argon2id
    const keyMaterial = await argon2id({
      password: masterPassword,
      salt: this.SALT,
      parallelism: 1,
      iterations: 256,
      memorySize: 512,
      hashLength: 32,
    });

    // Importar para Web Crypto API
    this.key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(keyMaterial),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt'],
    );
  }

  async encryptRecord(data: any): Promise<EncryptedRecord> {
    if (!this.key) throw new Error('Vault not initialized');

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      this.key,
      encodedData,
    );

    return {
      data: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      timestamp: new Date().toISOString(),
      hash: await this.calculateHMAC(encrypted),
    };
  }

  private async calculateHMAC(data: ArrayBuffer): Promise<string> {
    const hmacKey = await crypto.subtle.importKey(
      'raw',
      this.key!,
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['sign'],
    );

    const signature = await crypto.subtle.sign('HMAC', hmacKey, data);

    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}

interface EncryptedRecord {
  data: number[];
  iv: number[];
  timestamp: string;
  hash: string;
}
