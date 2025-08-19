Perfeito 👌 Vou atualizar o PRD com as informações que você trouxe (prints reais, tabela de classificação final, pontuação configurável). Segue o pacote completo revisado:

---

## masterplan.md

### 🚀 Elevator Pitch

Plataforma web moderna para organizar campeonatos de Call of Duty Mobile (Battle Royale). Ela gerencia inscrições, estrutura de grupos, processa automaticamente prints de resultados via IA (Gemini) e gera rankings finais profissionais prontos para compartilhar.

### 📌 Problema & Missão

* **Problema:** Organizadores usam planilhas e planilhas manuais, demorando horas para consolidar resultados.
* **Missão:** Automatizar a coleta, leitura e cálculo dos resultados, oferecendo uma experiência fluida tanto para organizadores quanto para equipes.

### 🎯 Público-Alvo

* Organizadores de torneios de COD Mobile.
* Clãs e comunidades que fazem treinos (x-treinos).
* Jogadores competitivos que querem clareza e profissionalismo nos rankings.

### ⭐ Core Features

* Cadastro de campeonatos (curtos ou longos, 1 ou múltiplos grupos).
* Inscrição de times (25 por grupo).
* Upload de prints de resultados (pode vir em várias telas → sistema junta tudo).
* IA (Gemini) extrai: **posição, kills, equipe** (tempo de sobrevivência opcional, para estatísticas).
* Cálculo automático de pontos (baseado em regras configuráveis).
* Ranking final consolidado em página pública + exportável em imagem estilizada.

### 🛠️ Tech Stack (alto nível)

* **Front-end:** React/Next.js (fluidez e performance).
* **Back-end:** Node.js + Express (API leve).
* **Banco:** PostgreSQL (relacional, ótimo para dados estruturados).
* **IA:** Gemini API (OCR + interpretação de prints).
* **Infra:** Vercel/Netlify (front) + AWS/GCP (back).

### 🗂️ Data Model (simplificado)

* **Team**: id, nome, logo, jogadores.
* **Championship**: id, nome, formato, regras de pontuação.
* **Group**: id, championship\_id, lista de equipes.
* **Match (queda)**: id, group\_id, ordem.
* **Result**: match\_id, team\_id, posição, kills, pontos.

### 🎨 UI Design Principles

* **Mobile-first**, foco em organizadores e jogadores.
* **Estilo gamer:** azul/verde/vermelho vibrantes, tipografia forte.
* Interface **“não me faça pensar”**: ações diretas (criar campeonato, subir print, ver ranking).
* Ranking final visualmente destacado, como exemplo do banner “X-Treino Favela”.

### 🔐 Segurança & Compliance

* Login com OAuth (Google/Discord).
* Proteção contra spam em inscrições.
* Logs e histórico de resultados.

### 🛣️ Roadmap

* **MVP:** Campeonatos, inscrições, upload de prints, IA + ranking automático (tabela padrão de pontos).
* **V1:** Configuração customizável de pontuação (kills/posição).
* **V2:** Exportação automática em imagem personalizada (estilo gamer), integração Discord.

### ⚠️ Riscos & Mitigações

* **IA erra leitura de algum time:** incluir validação manual opcional.
* **Múltiplas telas por queda:** sistema concatena automaticamente prints de ranking em uma só queda.
* **Infra em dia de campeonato:** cloud com auto-scaling.

### 🔮 Futuro

* Suporte a outros jogos (Free Fire, PUBG).
* Estatísticas detalhadas de jogadores.
* Streaming overlay com ranking em tempo real.

---

## implementation-plan.md

### 🔧 Build Sequence

1. Modelagem de dados (Times, Campeonatos, Grupos, Quedas, Resultados).
2. Cadastro de campeonatos + inscrição de equipes.
3. Upload de prints por queda (múltiplas imagens).
4. Integração IA Gemini → extrair dados (time, kills, posição).
5. Implementar regra padrão de pontuação (posição + kills).
6. Ranking acumulado automático.
7. Página pública de resultados.
8. Módulo de pontuação configurável.
9. Exportação em imagem estilizada.

### ⏱️ Timeline

* Semana 1–2: Estrutura inicial + auth.
* Semana 3: Campeonatos + inscrição.
* Semana 4: Upload de prints + integração IA.
* Semana 5: Ranking automático com pontos padrão.
* Semana 6: Configuração de pontuação + testes fechados.
* Semana 7: Beta com exportação de ranking.

### 👥 Equipe & Rituais

* **PM/Founder:** visão, testes com organizadores.
* **Dev Back:** API, integração IA.
* **Dev Front:** UI campeonatos, upload, ranking.
* **QA:** simulações de torneios completos.
* Ritual: review semanal + 1 teste de usabilidade rápido a cada sprint.

### ➕ Stretch Goals

* Bot no Discord com resultados automáticos.
* Estatísticas extras (MVP kills, sobrevivência média).
* Rankings históricos por equipe.

---

## design-guidelines.md

### 🎤 Voz & Tom

* Gamer, empolgante, objetivo.
* Mensagens curtas e diretas (“Equipe cadastrada!”, “Print recebido”).

### 🎨 Estilo Visual

* **Cores:** Azul escuro como base + acentos em vermelho/verde neon.
* **Tipografia:** Orbitron / Rajdhani (estilo gamer).
* **Espaçamento:** Tabelas compactas, botões grandes.
* **Contraste:** Mínimo AA garantido.

### 📐 Layout

* Mobile-first com grids responsivos.
* Ranking como **tabela visual**, posições destacadas.
* Exportação com visual gamer (similar ao exemplo que você enviou).

### ♿ Acessibilidade

* Texto ≥ 14 pt.
* Labels claros em botões.
* Foco visível.
* Alternativa textual para logos e tabelas exportadas.

### ✍️ Conteúdo

* Títulos claros (“Ranking Final”, “Subir Print”).
* Links descritivos (“Ver pontuação da queda 1”).
* Bullets em vez de parágrafos longos.

---

## app-flow-pages-and-roles.md

### 🌐 Site Map

* **Home** – campeonatos disponíveis.
* **Campeonato** – detalhes + inscrição.
* **Queda** – upload de prints + resultados parciais.
* **Ranking Final** – tabela consolidada.
* **Admin Dashboard** – gerenciar regras, grupos e validações.

### 🎯 Propósito de Cada Página

* Home: listar campeonatos ativos.
* Campeonato: info + botão de inscrição.
* Queda: upload de prints, ver resultados por partida.
* Ranking Final: classificação acumulada (compartilhável).
* Admin: configurações do campeonato e regras de pontuação.

### 👥 User Roles

* **Admin:** cria campeonatos, define regras de pontos, valida resultados.
* **Team Captain:** inscreve equipe, consulta resultados.
* **Player:** acompanha resultados.
* **Viewer:** público, só visualiza ranking final.

### 🛤️ User Journeys

* **Organizador:** cria campeonato → define regras de pontos → recebe prints → IA processa → ranking gerado.
* **Equipe:** inscreve → participa → vê ranking final.
* **Espectador:** acessa link → acompanha tabela final.

---

✅ Esse PRD já considera os prints que você mandou e a necessidade de **pontuação configurável**.

Quer que eu prepare também um **exemplo de tabela de pontos padrão** (posição + kill) para servir como default inicial no sistema?
