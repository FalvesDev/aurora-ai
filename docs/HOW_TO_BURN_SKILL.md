# Como gravar um disco de skill

## O que vai no disco

O modelo NÃO vai no disco — ele fica cacheado no HD após o primeiro `ollama pull`.
O disco carrega a identidade, a chave de memória e o contexto da skill.

```
/AURORA_SKILL/               ← pasta raiz (obrigatória com este nome)
  aurora.key                 ← chave AES-256 gerada pelo app
  skill.json                 ← metadados da skill
  system_prompt.md           ← personalidade
  model/
    Modelfile                ← config do modelo Ollama
  tools/
    executor.json            ← permissões
  examples/
    few_shot.json            ← exemplos de calibração
  seed/
    initial_context.md       ← contexto inicial (edite antes de gravar)
  docs/
    README.txt               ← documentação
```

Tamanho total (sem modelo): ~1-5 MB
Espaço restante no DVD+R DL (8.5GB): use para o que quiser:
  - Snapshots dos seus projetos
  - Documentação de frameworks que usa
  - Templates e boilerplates de código
  - Anotações pessoais
  - Qualquer arquivo que esta skill precise de contexto

## Passo a passo

### 1. Gerar a skill no app
  Menu → Skill Creator → preencha os campos → exportar

### 2. Editar o contexto inicial (opcional mas recomendado)
  Abra `seed/initial_context.md` e preencha com suas informações
  Isso dá à Aurora contexto imediato sobre você

### 3. Copiar para o DVD
  Copie toda a pasta `AURORA_SKILL/` para a raiz do DVD
  Adicione qualquer arquivo extra que queira no disco

### 4. Gravar
  Use o ImgBurn, Windows Explorer (gravar para disco) ou qualquer software
  DVD+R DL: use 4x de velocidade para melhor confiabilidade

### 5. Verificar
  Ejete e reinsira o disco
  O app deve detectar e carregar a skill automaticamente

## Atenção

- `aurora.key` é ÚNICA por disco. Não copie a mesma chave para dois discos.
- Sem a chave, as memórias criptografadas são inacessíveis.
- Faça backup da chave se quiser (mas guarde com segurança).
