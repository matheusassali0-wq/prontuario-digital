export class AuditLogger {
  private readonly AUDIT_CHAIN: AuditEvent[] = [];

  async logSecureEvent(event: AuditEvent): Promise<string> {
    const previousHash =
      this.AUDIT_CHAIN.length > 0 ? this.AUDIT_CHAIN[this.AUDIT_CHAIN.length - 1].hash : '0';

    const secureEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      hash: await this.calculateEventHash(event, previousHash),
    };

    this.AUDIT_CHAIN.push(secureEvent);
    await this.persistAuditChain();

    return secureEvent.hash;
  }

  private async calculateEventHash(event: AuditEvent, previousHash: string): Promise<string> {
    const data = JSON.stringify({
      ...event,
      previousHash,
      timestamp: new Date().toISOString(),
    });

    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(data));

    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async verifyAuditChain(): Promise<boolean> {
    for (let i = 1; i < this.AUDIT_CHAIN.length; i++) {
      const currentEvent = this.AUDIT_CHAIN[i];
      const previousEvent = this.AUDIT_CHAIN[i - 1];

      const calculatedHash = await this.calculateEventHash(currentEvent, previousEvent.hash);

      if (calculatedHash !== currentEvent.hash) {
        return false;
      }
    }
    return true;
  }
}
