# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Roda a Fita**! Este documento fornece diretrizes para contribuições.

## 📋 Como Contribuir

### 1. Fork e Clone

1. Faça um fork do repositório
2. Clone seu fork localmente:
   ```bash
   git clone https://github.com/GuiBragaia/roda-a-fita.git
   cd roda-a-fita
   ```

### 2. Configuração do Ambiente

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Execute o projeto em desenvolvimento:
   ```bash
   pnpm dev
   ```

3. Acesse `http://localhost:3000` para verificar se está funcionando

### 3. Criando uma Branch

Crie uma branch para sua feature:
```bash
git checkout -b feature/nome-da-feature
```

**Convenções de nomenclatura:**
- `feature/nome-da-feature` - Novas funcionalidades
- `fix/nome-do-bug` - Correções de bugs
- `docs/nome-da-documentacao` - Melhorias na documentação
- `refactor/nome-do-refactor` - Refatorações de código

### 4. Desenvolvimento

#### Diretrizes de Código

- **TypeScript**: Use TypeScript para todo novo código
- **Componentes**: Siga o padrão de componentes do shadcn/ui
- **Estilos**: Use Tailwind CSS para estilização
- **Ícones**: Use Lucide React para ícones
- **Acessibilidade**: Mantenha a acessibilidade em mente

#### Estrutura de Arquivos

```
components/
├── ui/           # Componentes de UI reutilizáveis
└── feature/      # Componentes específicos de features

hooks/            # Custom hooks
lib/              # Utilitários e configurações
data/             # Dados estáticos
```

#### Convenções de Commit

Use commits semânticos:
```bash
feat: adiciona sistema de favoritos
fix: corrige bug no carregamento de filmes
docs: atualiza README com novas funcionalidades
refactor: refatora componente de loading
style: ajusta espaçamento dos cards
test: adiciona testes para hook de filmes
```

### 5. Testes

Antes de submeter, certifique-se de:

- [ ] O código compila sem erros
- [ ] Não há warnings no console
- [ ] A aplicação funciona corretamente
- [ ] O design está responsivo
- [ ] A acessibilidade está adequada

### 6. Pull Request

1. Commit suas mudanças:
   ```bash
   git add .
   git commit -m "feat: descrição da feature"
   ```

2. Push para sua branch:
   ```bash
   git push origin feature/nome-da-feature
   ```

3. Abra um Pull Request no GitHub

#### Template do Pull Request

```markdown
## 📝 Descrição
Breve descrição das mudanças

## 🎯 Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## 🧪 Como Testar
1. Clone a branch
2. Execute `pnpm install`
3. Execute `pnpm dev`
4. Teste a funcionalidade

## 📸 Screenshots (se aplicável)
Adicione screenshots das mudanças visuais

## ✅ Checklist
- [ ] Código segue as diretrizes do projeto
- [ ] Testei localmente
- [ ] Documentação foi atualizada
- [ ] Não há conflitos
```

## 🎨 Diretrizes de Design

### Paleta de Cores
- **Primary**: `oklch(0.7 0.3 340)` - Rosa vibrante
- **Accent**: `oklch(0.7 0.25 280)` - Roxo elegante
- **Background**: `oklch(0.05 0 0)` - Preto profundo

### Componentes
- Use os componentes do shadcn/ui quando possível
- Mantenha consistência visual
- Priorize a acessibilidade
- Teste em diferentes tamanhos de tela

## 🐛 Reportando Bugs

Use o template de issue para bugs:

```markdown
## 🐛 Descrição do Bug
Descrição clara e concisa do bug

## 🔄 Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## ✅ Comportamento Esperado
O que deveria acontecer

## 📱 Informações do Sistema
- OS: [ex: Windows, macOS, Linux]
- Navegador: [ex: Chrome, Firefox, Safari]
- Versão: [ex: 22]

## 📸 Screenshots
Adicione screenshots se aplicável
```

## 💡 Sugerindo Features

Use o template de issue para features:

```markdown
## 💡 Descrição da Feature
Descrição clara da funcionalidade desejada

## 🎯 Problema que Resolve
Como isso melhora a experiência do usuário

## 💭 Solução Proposta
Como você imagina que deveria funcionar

## 🔄 Alternativas Consideradas
Outras abordagens que você considerou
```

## 📞 Comunicação

- **Issues**: Use o GitHub Issues para bugs e features
- **Discussões**: Use o GitHub Discussions para perguntas gerais
- **Código de Conduta**: Seja respeitoso e inclusivo

## 🏆 Reconhecimento

Contribuidores serão reconhecidos no README do projeto. Contribuições significativas podem resultar em acesso de mantenedor.

---

**Obrigado por contribuir com o Roda a Fita! 🎬**
