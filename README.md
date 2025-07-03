MeridianProtocol (OCTP) - Next-Generation DeFi Frontend

A sophisticated, professional DeFi protocol interface that feels like institutional-grade financial software rather than typical "degen DeFi" applications.

## 🌟 Overview

MeridianProtocol is an omni-chain financial infrastructure platform that enables users to:
- Build on-chain reputation through a Trust Score system
- Deposit collateral across multiple chains (EVM → Solana)
- Borrow assets with enhanced LTV ratios based on reputation
- Manage cross-chain financial positions in a unified interface

## 🎨 Design Philosophy

**Professional & Clean Aesthetic**
- Dark theme with deep blues, dark greys, and clean white text
- Single vibrant accent color (bright blue) for primary CTAs
- Clean typography using Inter font family
- Professional card-based layout system
- Respects user intelligence with clear data presentation

## 🚀 Key Features

### **Multi-Step User Journey**

#### **Step 0: Wallet Connection**
- Dual wallet connection (Solana + EVM)
- Clean landing page with prominent CTA
- Visual confirmation with wallet addresses

#### **Step 1: Identity Creation**
- Comprehensive onboarding with value propositions
- OCI NFT identity anchor explanation
- Permanent action confirmation

#### **Step 2: Main Dashboard**
- **Trust Score Card**: Current score, tier, and progression
- **Net Position Card**: Health factor and financial overview
- **Collateral Card**: Cross-chain asset management
- **Debt Card**: Active loans and borrowing options

#### **Step 3: Cross-Chain Deposits**
- WETH deposits from Sepolia to Solana
- Multi-step transaction tracking
- Real-time cross-chain status updates

#### **Step 4: Enhanced Borrowing**
- Dynamic LTV visualization with tier bonuses
- Real-time health factor calculations
- Trust Score bonus explanations

### **Trust Score System**
- **Bronze/Silver/Gold/Platinum Tiers**
- **LTV Bonuses**: Higher tiers unlock better borrowing terms
- **Visual Progress Tracking**: Clear tier advancement paths

### **Cross-Chain Infrastructure**
- **EVM → Solana**: Collateral deposits via LayerZero
- **Status Tracking**: Real-time transaction monitoring
- **Professional UX**: Institutional-grade waiting states

## 🛠 Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Components**: Custom shadcn/ui implementation
- **State Management**: React hooks with global state
- **Icons**: Lucide React
- **Typography**: Inter font family

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd meridian-protocol

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000