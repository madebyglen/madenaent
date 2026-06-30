import { Product, Order, Message, OrderItem } from '../types';

const API_BASE = 'http://localhost:8000/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  return res.json() as Promise<T>;
}

function parseProduct(p: any): Product {
  return {
    ...p,
    price: parseFloat(p.price),
    total_amount: p.total_amount ? parseFloat(p.total_amount) : undefined,
  };
}

export const api = {
  getProducts: (category?: string) =>
    fetchJSON<any[]>(`${API_BASE}/products${category && category !== 'all' ? `?category=${category}` : ''}`)
      .then((data) => data.map(parseProduct)),

  getProduct: (id: string) =>
    fetchJSON<any>(`${API_BASE}/products/${id}`).then(parseProduct),

  createProduct: (product: { name: string; description: string; category: string; price: number; image_url: string; stock: number }) =>
    fetchJSON<any>(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).then(parseProduct),

  deleteProduct: (id: string) =>
    fetchJSON<{ success: boolean; deleted: number }>(`${API_BASE}/products/${id}`, {
      method: 'DELETE',
    }),

<<<<<<< HEAD
=======
  updateProduct: (id: string, product: Partial<{ name: string; description: string; category: string; price: number; image_url: string; stock: number }>) =>
    fetchJSON<any>(`${API_BASE}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    }).then(parseProduct),

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
  createOrder: (order: { customer_name: string; customer_email: string; customer_phone?: string; items: OrderItem[] }) =>
    fetchJSON<any>(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    }).then((o) => ({ ...o, total_amount: parseFloat(o.total_amount) })),

  getOrders: () =>
    fetchJSON<any[]>(`${API_BASE}/orders`).then((data) =>
      data.map((o) => ({ ...o, total_amount: parseFloat(o.total_amount) }))
    ),

  updateOrderStatus: (id: string, status: string) =>
    fetchJSON<{ success: boolean; order: Order }>(`${API_BASE}/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }),

  createMessage: (message: { name: string; email: string; phone?: string; subject: string; content: string }) =>
    fetchJSON<Message>(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    }),

  getMessages: () =>
    fetchJSON<Message[]>(`${API_BASE}/messages`),

  markMessageRead: (id: string) =>
    fetchJSON<{ success: boolean }>(`${API_BASE}/messages/${id}/read`, {
      method: 'PATCH',
    }),
};
