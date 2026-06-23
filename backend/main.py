from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from decimal import Decimal
from database import (
    create_product, get_products, get_product_by_id, delete_product,
    create_order, get_orders, update_order_status,
    create_message, get_messages, mark_message_read
)
from models import Product, ProductCreate, Order, OrderCreate, OrderStatusUpdate, Message, MessageCreate

app = FastAPI(title="EDC Gear Store API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/products", response_model=Product)
async def add_product(product: ProductCreate):
    data = await create_product(product.model_dump(mode="json"))
    return data

@app.get("/api/products", response_model=List[Product])
async def list_products(category: Optional[str] = None):
    data = await get_products(category=category)
    return data

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    data = await get_product_by_id(product_id)
    if not data:
        raise HTTPException(status_code=404, detail="Product not found")
    return data

@app.delete("/api/products/{product_id}")
async def remove_product(product_id: str):
    data = await delete_product(product_id)
    return {"success": True, "deleted": len(data)}

@app.post("/api/orders", response_model=Order)
async def place_order(order: OrderCreate):
    total = Decimal("0")
    for item in order.items:
        total += item.quantity * item.price_at_time
    order_data = {
        "customer_name": order.customer_name,
        "customer_email": order.customer_email,
        "customer_phone": order.customer_phone,
        "status": "pending",
        "total_amount": str(total),
    }
    items = [{"product_id": str(i.product_id), "quantity": i.quantity, "price_at_time": str(i.price_at_time)} for i in order.items]
    data = await create_order(order_data, items)
    return data

@app.get("/api/orders", response_model=List[Order])
async def list_orders(limit: int = 200, offset: int = 0):
    data = await get_orders(limit=limit, offset=offset)
    return data

@app.patch("/api/orders/{order_id}")
async def update_order(order_id: str, update: OrderStatusUpdate):
    data = await update_order_status(order_id, update.status)
    if not data:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"success": True, "order": data[0]}

@app.post("/api/messages", response_model=Message)
async def send_message(message: MessageCreate):
    data = await create_message(message.dict())
    return data

@app.get("/api/messages", response_model=List[Message])
async def list_messages(limit: int = 200, offset: int = 0):
    data = await get_messages(limit=limit, offset=offset)
    return data

@app.patch("/api/messages/{message_id}/read")
async def read_message(message_id: str):
    data = await mark_message_read(message_id)
    if not data:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
