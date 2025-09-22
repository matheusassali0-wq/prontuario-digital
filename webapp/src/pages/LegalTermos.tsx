export default function LegalTermos() {
  return (
    <article className="settings-card" aria-labelledby="termos-title">
      <header className="card-header">
        <div>
          <h1 id="termos-title">Termos de uso</h1>
          <p className="card-subtitle">Condições resumidas para uso do Prontuário Digital na clínica.</p>
        </div>
      </header>
      <section className="info-block" aria-label="Responsabilidades">
        <p>
          O acesso é exclusivo a profissionais autorizados. Cada ação executada gera auditoria WORM; compartilhe credenciais
          apenas com a equipe habilitada. Eventos suspeitos devem ser reportados imediatamente ao administrador do sistema.
        </p>
      </section>
      <section className="info-block" aria-label="Disponibilidade">
        <p>
          O serviço é fornecido em regime de melhor esforço, com backups em rota dedicada. Para emergências, mantenha exportações
          locais atualizadas (JSON) geradas pelo módulo de configurações.
        </p>
      </section>
      <section className="info-block" aria-label="Suporte">
        <p>
          Suporte técnico: suporte@clinic.local · Segunda a Sexta, 08h às 18h (GMT-3).
        </p>
      </section>
    </article>
  );
}
