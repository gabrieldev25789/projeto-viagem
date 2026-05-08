# ✈️ GrizzyFlyes — Travel Website (React)

Site de viagens com interface moderna e interativa para busca, filtragem e compra de destinos turísticos.

---

## 📸 Preview

| Home | Destinos | Carrinho |
|------|----------|----------|
| ![home]("../assets/imgs/prints/print1.png") | ![destinos](prints/destinos.png) | ![carrinho](prints/carrinho.png) |

| Seleção de Datas | Hotel | Confirmação |
|------------------|-------|-------------|
| ![datas](prints/datas.png) | ![hotel](prints/hotel.png) | ![confirmacao](prints/confirmacao.png) |

> Adicione os prints na pasta `/prints` na raiz do projeto com os nomes acima.

---

## 🌍 Sobre o projeto

Aplicação desenvolvida em React que permite ao usuário explorar destinos por cidade, país ou continente, selecionar datas de viagem, adicionar hotéis e finalizar um pedido com escolha de método de pagamento.

---

## 🚀 Funcionalidades

* Listagem de destinos em cards agrupados por continente e país
* Filtros de busca por cidade, país e continente
* Ordenação de destinos por preço (crescente/decrescente)
* Seleção de datas com cálculo automático de custo por noite
* Modal de seleção de hotel com 3 opções
* Carrinho lateral com agrupamento de itens e total dinâmico
* Página de confirmação de pedido com desconto por método de pagamento
* Persistência do carrinho via `localStorage`
* Toasts de feedback para ações do usuário
* Layout responsivo

---

## 🛠️ Tecnologias

* React
* React Router DOM
* JavaScript (ES6+)
* CSS3 (glassmorphism, animações, responsivo)

---

## ▶️ Como usar

### Pré-requisitos

* Node.js instalado
* npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gabrieldev25789/projeto-viagem.git

# Entre na pasta
cd projeto-viagem

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

### Fluxo de uso

1. Clique em **"Click to see destinations"** para abrir o painel de destinos
2. Use os filtros para buscar por **cidade**, **país** ou **continente**
3. Clique em um card para selecionar o destino
4. Escolha as **datas de ida e volta** no calendário
5. Selecione ou pule a etapa de **hotel**
6. Revise os itens no **carrinho lateral**
7. Clique em **Finish** para ir à página de confirmação
8. Escolha o **método de pagamento** e confirme o pedido

---

## 📂 Estrutura do projeto

```bash
/src
  ├── assets/
  │     └── city-imgs/
  ├── Components/
  │     ├── Cart/
  │     ├── Data/
  │     ├── Finish/
  │     ├── FlightSearch/
  │     ├── Hotel/
  │     ├── Main/
  │     ├── Message/
  │     ├── NavBar/
  │     ├── OrderValue/
  │     ├── Places/
  │     └── Search/
  ├── App.jsx
  └── main.jsx
/pages
  └── Requested.jsx 
```

---

## 💡 Aprendizados

* Componentização e composição no React
* Gerenciamento de estado com `useState` e `useRef`
* Comunicação entre componentes via props
* Persistência com `localStorage`
* Estilização avançada com CSS puro (glassmorphism, animações)
* Roteamento com React Router DOM

---

📧 support@GrizzyFlyes.com · © 2026 GrizzyFlyes · All rights reserved

