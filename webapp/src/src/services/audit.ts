export class AuditService {
  private readonly AUDIT_KEY = 'AUDIT_LOG_2024';
  private logs: AuditLog[] = [];

  async logEvent(event: AuditEvent) {
    const log: AuditLog = {
      ...event,
      timestamp: new Date().toISOString(),
      hash: await this.calculateEventHash(event),
      previousHash: this.logs[this.logs.length - 1]?.hash || '0',
    };

    this.logs.push(log);
    await this.persistLog(log);
  }

  private async calculateEventHash(event: AuditEvent): Promise<string> {
    const data = JSON.stringify({
      ...event,
      timestamp: new Date().toISOString(),
    });

    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));

    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async persistLog(log: AuditLog) {
    const encryptedLog = await this.encryptLog(log);
    const currentLogs = this.getStoredLogs();
    currentLogs.push(encryptedLog);

    localStorage.setItem(this.AUDIT_KEY, JSON.stringify(currentLogs));
  }

  private async encryptLog(log: AuditLog): Promise<string> {
    const key = await this.getAuditKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      new TextEncoder().encode(JSON.stringify(log)),
    );

    return btoa(
      JSON.stringify({
        data: Array.from(new Uint8Array(encrypted)),
        iv: Array.from(iv),
      }),
    );
  }

  private async getAuditKey(): Promise<CryptoKey> {
    // Usar uma chave derivada do certificado do sistema
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(process.env.REACT_APP_AUDIT_SECRET!),
      'PBKDF2',
      false,
      ['deriveKey'],
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new TextEncoder().encode('audit-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt'],
    );
  }

  private getStoredLogs(): string[] {
    try {
      return JSON.parse(localStorage.getItem(this.AUDIT_KEY) || '[]');
    } catch {
      return [];
    }
  }
}

interface AuditEvent {
  type: 'access' | 'modify' | 'delete';
  user: string;
  resource: string;
  details?: any;
}

interface AuditLog extends AuditEvent {
  timestamp: string;
  hash: string;
  previousHash: string;
}
