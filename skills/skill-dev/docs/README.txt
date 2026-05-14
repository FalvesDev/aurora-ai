━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AURORA — SKILL DISC: DEV
  v1.0.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Este disco contém a skill DEV da Aurora.

MODELO BASE: llama3.1:8b
  O modelo precisa estar instalado no Ollama local.
  Se não estiver: ollama pull llama3.1:8b

O QUE ESTA SKILL FAZ:
  - Análise e escrita de código em qualquer linguagem
  - Debug e resolução de erros
  - Revisão de código com feedback detalhado
  - Arquitetura de sistemas e projetos
  - Explicações adaptadas ao seu nível
  - Execução de código com confirmação
  - Orientação de carreira técnica

O QUE NÃO FAZ:
  - Não executa código sem confirmação explícita
  - Não acessa a internet
  - Não compartilha seus dados com ninguém

ESTRUTURA DO DISCO:
  /AURORA_SKILL/
    aurora.key          Chave de criptografia (não compartilhe)
    skill.json          Configuração da skill
    system_prompt.md    Personalidade da Aurora
    model/Modelfile     Configuração do modelo Ollama
    tools/executor.json Permissões e ferramentas
    examples/           Exemplos de calibração
    seed/               Contexto inicial (edite antes de gravar)
    docs/               Esta documentação

COMO USAR:
  Insira o disco → Aurora carrega → converse normalmente.
  Remova o disco → Aurora salva e apaga tudo da RAM.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  github.com/FalvesDev/aurora-ai
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
