# Kero Arts Papelaria✨

Aplicação web para montar pedidos personalizados de cadernos, fichários e planners, com fluxo de configuração guiado por etapas e envio do pedido finalizado diretamente para o WhatsApp da loja.

> 💜 Kero Arts Papelaria– Onde a criatividade encontra propósito ✨

## Sobre o projeto

O projeto é uma vitrine/configurador interativo construído em **React + Vite**, onde o cliente:

1. Escolhe o tipo de produto (caderno, fichário ou planner);
2. Define tamanho, quantidade de folhas e tipo de planner (quando aplicável);
3. Escolhe o estilo de capa;
4. Personaliza com nome (com opção de folha de ouro/foil);
5. Escolhe a cor das argolas (no caso de fichário);
6. Adiciona observações livres;
7. Revisa o resumo do pedido e envia tudo formatado para o WhatsApp da atendente.

Há também uma página dedicada de **busca de capas** (`/capas`), com grid de imagens, pesquisa por nome/índice e visualização em modal.

## Funcionalidades

- **Fluxo progressivo de etapas**: cada seção do formulário só aparece depois que a anterior é preenchida, guiando o cliente passo a passo.
- **Lógica condicional por produto**: opções de tamanho, folhas e capa mudam dinamicamente conforme o produto e tipo de planner selecionados.
- **Reset inteligente**: ao trocar o produto, as escolhas dependentes (tamanho, folhas, capa, etc.) são reiniciadas automaticamente.
- **Personalização de nome com foil/dourado**: opção extra de acabamento especial.
- **Seleção de cor das argolas**: exclusiva para o produto fichário.
- **Resumo do pedido**: revisão de tudo antes do envio.
- **Integração com WhatsApp**: gera e envia a mensagem do pedido pronta para a atendente.
- **Busca de capas** (`/capas`): grid responsivo com todas as capas disponíveis, busca por texto/número e visualização ampliada em modal.
- **Layout responsivo** com identidade visual própria (tons lilás, rosa e creme) e pequenas animações de transição entre etapas.

## Tecnologias

- [React](https://react.dev/)
- [React Router](https://reactrouter.com/) — roteamento entre Home (`/`) e Busca de Capas (`/capas`)
- [Vite](https://vitejs.dev/) — build tool e dev server (uso de `import.meta.glob` para carregar imagens dinamicamente)
- [Sass/SCSS](https://sass-lang.com/) — estilização com variáveis e nesting

## Estrutura do projeto

```
src/
├── App.jsx                      # Definição das rotas da aplicação
├── pages/
│   ├── Home.jsx                  # Fluxo principal de montagem do pedido
│   └── CoverSearch.jsx           # Página de busca/visualização de capas
├── components/
│   ├── Header/
│   ├── ProductSelector/
│   ├── SizeSelector/
│   ├── SheetCountSelector/
│   ├── CoverSelector/
│   ├── NameSelector/
│   ├── RingColorSelector/
│   ├── PlannerSelector/
│   ├── OrderSummary/
│   └── WhatsAppButton/
├── styles/
│   ├── _variables.scss           # Paleta de cores e variáveis globais
│   └── app.scss                  # Estilos globais e dos blocos principais
└── assets/
    └── covers/                   # Imagens das capas disponíveis (carregadas dinamicamente)
```

> Os componentes de seleção (`ProductSelector`, `SizeSelector`, `SheetCountSelector`, `CoverSelector`, `NameSelector`, `RingColorSelector`, `PlannerSelector`), `Header`, `OrderSummary` e `WhatsAppButton` são consumidos pela página `Home` mas não fazem parte deste conjunto de arquivos — devem existir em `src/components/`.

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (recomendado 18+)
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd kero-arts

# Instale as dependências
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173` (porta padrão do Vite).

### Build de produção

```bash
npm run build
```

## Rotas

| Rota     | Página        | Descrição                                             |
| -------- | ------------- | ----------------------------------------------------- |
| `/`      | `Home`        | Fluxo de montagem do pedido personalizado             |
| `/capas` | `CoverSearch` | Galeria de busca e visualização das capas disponíveis |

## Como adicionar novas capas

As imagens de capa são carregadas automaticamente via `import.meta.glob` a partir de:

```
src/assets/covers/*.{png,jpg,jpeg,webp}
```

Basta adicionar uma nova imagem nessa pasta — ela aparecerá automaticamente tanto no `CoverSelector` (fluxo do pedido) quanto na página `/capas`. A ordenação segue o número presente no nome do arquivo (ex: `capa-12.png`).

## Identidade visual

A paleta de cores é definida em `src/styles/_variables.scss` e inclui tons de lilás, rosa e creme, usados de forma consistente em botões, cards e destaques (como o selo de preço `info-price` e os badges numerados de cada etapa).

## Contato

Pedidos finalizados são enviados via WhatsApp diretamente para a atendente da loja, com todos os detalhes da personalização escolhida pelo cliente.
