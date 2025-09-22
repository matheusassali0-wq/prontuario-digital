export default function LegalPrivacidade() {
  return (
    <article className="settings-card" aria-labelledby="privacidade-title">
      <header className="card-header">
        <div>
          <h1 id="privacidade-title">Política de privacidade</h1>
          <p className="card-subtitle">Resumo das práticas adotadas conforme LGPD (Lei 13.709/2018).</p>
        </div>
      </header>
      <section className="info-block" aria-label="Base legal">
        <p>
          Os dados são tratados sob a base legal de prestação de serviços de saúde (art. 7º, II e art. 11, II, f). Os acessos
          são registrados em auditoria imutável, com retenção mínima de 5 anos.
        </p>
      </section>
      <section className="info-block" aria-label="Segurança">
        <p>
          Segredos são armazenados com AES-256-GCM e somente perfis Admin conseguem rotacioná-los. Os backups gerados não incluem
          segredos; utilize canais seguros para atualizar credenciais sensíveis.
        </p>
      </section>
      <section className="info-block" aria-label="Direitos do titular">
        <p>
          Pacientes podem solicitar revisão, correção ou exclusão de dados via canal dpo@clinic.local. Exportações LGPD podem ser
          geradas individualmente na tela de pacientes.
        </p>
      </section>
    </article>
  );
}
