# 🎬 Roda a Fita

> **Descubra sua próxima obra-prima cinematográfica**

Uma aplicação web moderna e elegante que recomenda filmes entre os 200 melhores da história do cinema. Com interface cinematográfica, sistema de favoritos e recomendações inteligentes.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## ✨ Características

### 🎨 Design Moderno
- **Interface cinematográfica** com glass morphism e gradientes dinâmicos
- **Animações fluidas** e transições suaves em toda a aplicação
- **Paleta de cores vibrante** com tons de rosa e roxo cinematográficos
- **Partículas animadas** em tempo real para maior imersão
- **Responsivo** e otimizado para todos os dispositivos

### 🚀 Funcionalidades
- **Sistema de recomendações inteligente** com filtros por gênero
- **Favoritos persistentes** salvos localmente
- **Compartilhamento nativo** via API Web Share ou clipboard
- **Notificações elegantes** com sistema de toast personalizado
- **Modo escuro/claro** com transições suaves
- **PWA ready** - instalável como aplicativo

### 🎯 Experiência do Usuário
- **Loading states elegantes** com spinners personalizados
- **Feedback visual imediato** para todas as ações
- **Navegação intuitiva** com elementos interativos
- **Acessibilidade** com foco em UX inclusiva
- **Performance otimizada** com lazy loading

## 🛠️ Stack Tecnológica

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI reutilizáveis
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### UI/UX
- **Glass Morphism** - Efeitos de vidro translúcido
- **Gradientes Dinâmicos** - Cores que se movem e respiram
- **Animações CSS** - Transições suaves e naturais
- **Partículas Interativas** - Elementos flutuantes em tempo real

### Paleta de Cores
- **Primary**: `oklch(0.7 0.3 340)` - Rosa vibrante
- **Accent**: `oklch(0.7 0.25 280)` - Roxo elegante
- **Background**: `oklch(0.05 0 0)` - Preto profundo
- **Card**: `oklch(0.1 0.02 340)` - Cinza escuro com sutil tintura

## 📱 Funcionalidades Principais

### 🎲 Descoberta de Filmes
- Clique no botão mágico para receber uma recomendação
- Filtros por gênero cinematográfico
- Seleção aleatória inteligente com sistema de pesos
- Informações detalhadas de cada filme
- Integração com TMDB para posters e dados adicionais

### ❤️ Sistema de Favoritos
- Adicione filmes à sua lista pessoal
- Persistência local automática
- Notificações de confirmação
- Contador de favoritos no footer

### 📤 Compartilhamento
- API Web Share nativa (mobile)
- Fallback para clipboard (desktop)
- Links personalizados com informações do filme
- Feedback visual para todas as ações

### 🌙 Tema Dinâmico
- Modo escuro por padrão (cinematográfico)
- Alternância suave entre temas
- Preferências salvas automaticamente
- Suporte a preferências do sistema

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/roda-a-fita.git
   cd roda-a-fita
   ```

2. **Instale as dependências**
   ```bash
   pnpm install
   ```

3. **Execute em desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção |
| `pnpm lint` | Verificação de código |

## 📦 Estrutura do Projeto

```
roda-a-fita/
├── app/                    # App Router (Next.js 15)
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI
│   └── theme-provider.tsx # Provedor de tema
├── data/                 # Dados estáticos
│   └── movies.json       # Base de dados de filmes
├── hooks/                # Custom hooks
├── lib/                  # Utilitários
└── public/               # Assets estáticos
```

## 🎨 Componentes Principais

- **`Particles`** - Sistema de partículas animadas
- **`LoadingSpinner`** - Spinners de carregamento elegantes
- **`CustomToast`** - Sistema de notificações toast
- **`TrailerModal`** - Modal para trailers
- **`WhereToWatch`** - Informações de onde assistir
- **`MovieStats`** - Estatísticas do filme

## 📱 PWA Features

- Manifesto web configurado
- Ícones em múltiplos tamanhos
- Tema de cores personalizado
- Modo standalone
- Shortcuts configurados

## 🎯 Melhorias Implementadas

### ✅ Visual e UX
- Design completamente renovado com glass morphism
- Animações fluidas e transições suaves
- Sistema de partículas interativas
- Paleta de cores cinematográfica moderna
- Componentes de loading elegantes
- Sistema de notificações toast personalizado

### ✅ Funcionalidades
- Feedback visual para todas as ações
- Sistema de favoritos com notificações
- Compartilhamento aprimorado com feedback
- PWA configurado e otimizado
- SEO e meta tags otimizadas
- Acessibilidade melhorada

### ✅ Performance
- Animações otimizadas com CSS
- Lazy loading de imagens
- Transições eficientes
- Código TypeScript tipado
- Componentes reutilizáveis

## 🔮 Roadmap

### Próximas Funcionalidades
- [ ] Integração com Framer Motion para animações mais avançadas
- [ ] Sistema de avaliações de usuários
- [ ] Recomendações baseadas em histórico
- [ ] Modo offline com cache de filmes
- [ ] Integração com APIs de streaming
- [ ] Sistema de playlists personalizadas

### Melhorias Técnicas
- [ ] Testes automatizados
- [ ] CI/CD pipeline
- [ ] Otimização de performance
- [ ] Internacionalização (i18n)

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, siga estas diretrizes:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Código
- Use TypeScript para todo novo código
- Siga as convenções do ESLint
- Mantenha a acessibilidade em mente
- Teste suas mudanças antes de submeter

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Seu Nome** - [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- [TMDB](https://www.themoviedb.org/) - API de dados de filmes
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI reutilizáveis
- [Radix UI](https://www.radix-ui.com/) - Componentes acessíveis
- [Lucide](https://lucide.dev/) - Ícones modernos
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS

---

**Desenvolvido com ❤️ e 🎬 para os amantes de cinema**

[⬆ Voltar ao topo](#-roda-a-fita)
