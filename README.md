# 🧪 testnet‑list

**A curated, searchable list of blockchain testnets**, built with modern tools to help developers quickly find and explore testnet environments.

---

## 🔍 Features

- Interactive **search** and **filter** functionality
- Organized by **chain name**, **RPC URL**, **faucet**, and **documentation**
- **Live updates** via a JSON source for easy repo contributions
- Built using **Vite**, **TypeScript**, **HTML**, and **Vanilla JS**

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ / LTS)
- npm or yarn

### Installation

```bash
git clone https://github.com/dennispaul8/testnet-list.git
cd testnet-list
npm install
```

### Development

```
npm run dev
```

### Build

```
npm run build
```

### 📁 Project Structure

```
testnet-list/
├── public/            # Static assets
├── src/
│   ├── index.html    
│   ├── main.ts        
│   ├── components/    
│   ├── data/
│   └── types/
│
├── .gitignore
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 🤝 Contribution
Contributions are welcome! To add or update a testnet entry:

1. Edit the JSON source (e.g. src/data/testnets.json)

2. Include the following fields:

```
{
  "name": "Goerli",
  "chainId": 5,
  "rpcUrl": "https://goerli.infura.io/v3/…",
  "faucet": "https://goerli-faucet.somelink.org",
  "docs": "https://goerli.net/docs"
}
```
3. Save your changes and submit a pull request

### 🛠️ Tech Stack
```
Vite – lightning-fast dev server and bundler

TypeScript – type safety

Vanilla JS/TS – lightweight UI interactions

HTML/CSS – clean, responsive styling
