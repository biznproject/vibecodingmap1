"""
VibeCodingMap x402 Model Context Protocol (MCP) Server
Allows any MCP-compliant coding assistant (Cursor, Claude Desktop, Windsurf)
to search and purchase verified architecture blueprints via x402.
"""
from fastmcp import FastMCP
import asyncio
import os
import sys

# Ensure UTF-8 output on Windows
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

from x402_client import X402Client

mcp = FastMCP("VibeCodingMap-x402-Server")
client = X402Client(base_url=os.getenv("VIBECODING_API_URL", "http://localhost:3000"))

@mcp.tool()
async def search_architecture_catalog() -> str:
    """
    Search available verified architecture blueprints on VibeCodingMap x402 Market.
    Returns available stack blueprints, aim summaries, and prices in USDC.
    """
    catalog = await client.get_catalog()
    items = catalog.get("items", [])
    output = "📋 [VibeCodingMap x402 Catalog]\n"
    for item in items:
        output += f"- [{item['slug']}] {item['title']}\n"
        output += f"  Price: {item['priceUSDC']} USDC | Category: {item['category']}\n"
        output += f"  Aim: {item['aimSummary']}\n\n"
    return output

@mcp.tool()
async def purchase_architecture_spec(slug: str) -> str:
    """
    Purchase and unlock full high-grade architecture specification via x402 micropayment.
    Args:
        slug: The specification slug (e.g., 'nextjs16-supabase-auth', 'agent-mcp-orchestration')
    """
    try:
        spec = await client.purchase_and_get_spec(slug)
        import json
        return json.dumps(spec, indent=2, ensure_ascii=False)
    except Exception as e:
        return f"Error purchasing spec: {str(e)}"

if __name__ == "__main__":
    mcp.run()