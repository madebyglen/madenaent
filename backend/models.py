from pydantic import BaseModel, EmailStr
from typing import List, Optional
from decimal import Decimal
from datetime import datetime
from uuid import UUID


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    price: Decimal
    image_url: Optional[str] = None
    stock: int = 0


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class OrderItemBase(BaseModel):
    product_id: UUID
    quantity: int
    price_at_time: Decimal


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: UUID
    order_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True


class OrderBase(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    status: str = "pending"
    total_amount: Decimal


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    items: List[OrderItemCreate]


class Order(OrderBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    items: Optional[List[OrderItem]] = None

    class Config:
        from_attributes = True


class MessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    content: str


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    id: UUID
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: str
