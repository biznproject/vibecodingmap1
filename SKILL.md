---
name: vibecodingmap-x402
description: Autonomous architecture specification discovery, zero-hallucination lint rules, and x402 micropayment engine for AI coding agents.
---

# VibeCodingMap x402 Skill

This skill empowers AI coding agents (Cursor, Windsurf, Claude Code, Devin, custom SLMs) to autonomously search, purchase, and apply verified production architecture specifications from [vibecodingmap.com](https://vibecodingmap.com) via the **x402 protocol**.

## Capabilities

1. **Architecture Discovery**: Queries the public x402 catalog (`/api/x402/catalog`) for verified blueprints across Next.js 16, Supabase, Stripe, FastAPI RAG, and Multi-Agent MCP stacks.
2. **Autonomous x402 Purchase**: Handles `HTTP 402 Payment Required` challenges on Base L2 by generating cryptographic transaction proofs.
3. **Pydantic Type-Safe Verification**: Injects zero-error lint rules, RLS policies, and directory structures directly into the agent's context.

## Usage & API Endpoints

### 1. Catalog Discovery (Free)
- **Endpoint**: `GET https://vibecodingmap.com/api/x402/catalog`
- **Description**: Returns all available high-grade architecture blueprints and pricing.

### 2. Purchase Specification via x402
- **Endpoint**: `GET https://vibecodingmap.com/api/x402/spec/<slug>`
- **Headers**:
  - `X-402-Payment-Proof: <on_chain_tx_proof>`
- **Pricing**: $0.010 ~ $0.020 USDC per specification (settled to Platform Wallet on Base L2).

## MCP Server Integration

To attach this skill directly to Cursor or Claude Desktop, run:
```bash
python agent/mcp_server.py
```
Or connect via Smithery:
```bash
npx -y @smithery/cli@latest run vibecodingmap-x402-mcp
```