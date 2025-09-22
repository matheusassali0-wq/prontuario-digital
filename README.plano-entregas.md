# Plano de Entregas — Prontuário Digital

## Visão geral
- **PR4a — Layout + Shell** (este PR): navbar, páginas vazias, cards mockados.
- **PR5 — Pacientes**: CRUD completo, busca instantânea, seleção ativa.
- **PR6 — Prontuários**: editor com templates “1ª consulta” e “Retorno”, autosave/offline.
- **PR7 — Exames**: presets e impressão de guias.
- **PR8 — Prescrições**: SSO Bird ID → Memed + fallback impressão A4/A5.
- **PR9 — Configurações/Security**: gestão de templates, `.env.example`, auditoria LGPD.

## Premissas
- Node 20+ / npm, ambiente WSL2 + VS Code.
- Sem API key Memed: priorizar fallback de impressão.
- Identidade visual neutra, tipografia Montserrat.

## Riscos & Mitigações
1. **Carga de arquivos grandes rastreados** → Issue “Backlog Soul-MV” orientará limpeza assistida.
2. **Integração Bird ID** → placeholders seguros até receber credenciais.
3. **Offline-first** → implementação incremental (cache → fila → conciliação).

## Próximas ações
- [ ] Abrir ISSUE “Backlog Soul-MV” com limpeza de artefatos pesados.
- [ ] Confirmar variáveis Bird ID (`ISSUER`, `CLIENT_ID`, `REDIRECT_URI`).
- [ ] Definir templates clínicos iniciais (JSON) para PR6/PR7.
