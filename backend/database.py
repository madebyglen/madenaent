import os
import httpx
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://tqydcuzawglcleuudfbm.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeWRjdXphd2dsY2xldXVkZmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDMzMTQsImV4cCI6MjA5NzcxOTMxNH0.rujOmlA_8zvi4LU-scebGNu8XV58R2MGLZFrNqkKNCM")

REST_BASE = f"{SUPABASE_URL}/rest/v1"
HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=representation",
}

client = httpx.AsyncClient(base_url=REST_BASE, headers=HEADERS, timeout=30.0)

<<<<<<< HEAD
=======
async def update_product(product_id: str, data: dict):
    resp = await client.patch("/products", params={"id": f"eq.{product_id}"}, json=data)
    resp.raise_for_status()
    result = resp.json()
    return result[0] if result else None

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
async def create_product(data: dict):
    resp = await client.post("/products", json=data)
    resp.raise_for_status()
    return resp.json()[0]

async def get_products(category: str = None, limit: int = 100):
    params = {"select": "*", "limit": limit}
    if category:
        params["category"] = f"eq.{category}"
    resp = await client.get("/products", params=params)
    resp.raise_for_status()
    return resp.json()

async def delete_product(product_id: str):
    resp = await client.delete("/products", params={"id": f"eq.{product_id}"})
    resp.raise_for_status()
    return resp.json()

async def get_product_by_id(product_id: str):
    resp = await client.get("/products", params={"id": f"eq.{product_id}", "select": "*", "limit": 1})
    resp.raise_for_status()
    data = resp.json()
    return data[0] if data else None

async def create_order(order_data: dict, items: list):
    resp = await client.post("/orders", json=order_data)
    resp.raise_for_status()
    order = resp.json()[0]
    for item in items:
        item["order_id"] = order["id"]
    resp_items = await client.post("/order_items", json=items)
    resp_items.raise_for_status()
    return order

async def get_orders(limit: int = 200, offset: int = 0):
    resp = await client.get("/orders", params={"select": "*,items:order_items(*,product:products(*))", "limit": limit, "offset": offset, "order": "created_at.desc"})
    resp.raise_for_status()
    return resp.json()

async def update_order_status(order_id: str, status: str):
    resp = await client.patch("/orders", params={"id": f"eq.{order_id}"}, json={"status": status})
    resp.raise_for_status()
    return resp.json()

async def create_message(message_data: dict):
    resp = await client.post("/messages", json=message_data)
    resp.raise_for_status()
    return resp.json()[0]

async def get_messages(limit: int = 200, offset: int = 0):
    resp = await client.get("/messages", params={"limit": limit, "offset": offset, "order": "created_at.desc"})
    resp.raise_for_status()
    return resp.json()

async def mark_message_read(message_id: str):
    resp = await client.patch("/messages", params={"id": f"eq.{message_id}"}, json={"is_read": True})
    resp.raise_for_status()
    return resp.json()
