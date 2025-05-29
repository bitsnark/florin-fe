# Florin Frontend

## Overview
Florin is a modern web application built with React and TypeScript. It provides a user-friendly interface for interacting with blockchain functionality, featuring components for wallet integration, QR code generation, and form handling.

## Tech Stack
- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query)
- **Routing**: TanStack Router
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI
- **Blockchain Integration**: wagmi, viem
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Setup

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone [repository-url]
cd florin-fe
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Development
To start the development server:
```bash
npm run dev
# or
yarn dev
```
The application will be available at `http://localhost:5173`

### Production Build
To create a production build:
```bash
npm run build
# or
yarn build
```

To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## Environment Variables
The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```env
# WalletConnect project ID for wallet connection functionality
VITE_WALLETCONNECT_PROJECT_ID=""

# RPC URL for connecting to the Ethereum network
VITE_RPC_URL=""

# Base URL for the Florin API endpoints
VITE_API_BASE_URL="https://florin.bitcoinos.build"

# Number of hours until a transaction expires
VITE_EXPIRATION_HOURS=24

# Minimum amount allowed for transactions (in BTC)
VITE_MIN_AMOUNT="0.0004"

# Maximum amount allowed for transactions (in BTC)
VITE_MAX_AMOUNT="3"

# Number of confirmations required for low-value related to VITE_EVM_CONFIRMATIONS_USD_AMOUNT EVM transactions
VITE_EVM_CONFIRMATIONS_LOW=1

# Number of confirmations required for high-value EVM transactions
VITE_EVM_CONFIRMATIONS_HIGH=10

# USD amount threshold that determines when to use high confirmations
VITE_EVM_CONFIRMATIONS_USD_AMOUNT=100

# Number of confirmations required for Bitcoin transactions
VITE_BTC_CONFIRMATIONS=6

# Default position id for reservation
VITE_DEFAULT_POSITION_ID=
```

## Contract Addresses Configuration
The application uses different contract addresses for different networks. These addresses are configured in `src/constants/contracts.ts`. To modify the contract addresses:

1. Navigate to `src/constants/contracts.ts`
2. Update the addresses in the `CONTRACTS_ADDRESS` object for the desired network:
   - `ammExchange`: AMM Exchange contract address
   - `marketMakerProxy`: Market Maker Proxy contract address
   - `florinForwarder`: Florin Forwarder contract address
   - `erc20BitSnark`: ERC20 BitSnark token contract address
   - `contractRegistry`: Contract Registry address

The file supports multiple networks, Sepolia testnet (chain ID: 11155111) and local development (chain ID: 31337).

## Main Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report
- `npm run deploy-prod` - Deploy to production
- `npm run deploy-staging` - Deploy to staging

## Tests
The project uses Vitest and React Testing Library for testing. To run tests:

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:coverage
```

## Deployment
The project is deployed using github actions and netlify. Set the followings actions variables in order to correctly deploy to netlify: 

NETLIFY_SITE_ID
NETLIFY_AUTH_TOKEN

### Continuous deployment trigger
On every new commit to `develop` (netflify preview) and `main` (netlify production)

## Contributing
1. Create a new branch for your feature
2. Make your changes
3. Run tests and ensure they pass
4. Submit a pull request

## License
[Add your license information here]
