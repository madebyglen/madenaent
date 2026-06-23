import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { uploadProductImage } from '../lib/supabase';
import { Product, Order, Message } from '../types';
import {
  Package, Mail, CheckCircle, Clock, Truck, Ban, Eye, EyeOff,
  Plus, Trash2, Save, X, ImageIcon, Loader2, Upload, Link
} from 'lucide-react';

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'text-gold-400', label: 'Pending' },
  confirmed: { color: 'text-cream-400', label: 'Confirmed' },
  shipped: { color: 'text-gold-200', label: 'Shipped' },
  delivered: { color: 'text-green-600', label: 'Delivered' },
  cancelled: { color: 'text-red-500', label: 'Cancelled' },
};

function StatusIcon({ status }: { status: string }) {
  const cls = 'w-4 h-4 ' + (statusConfig[status]?.color || 'text-gold-400');
  switch (status) {
    case 'pending': return <Clock className={cls} />;
    case 'confirmed': return <CheckCircle className={cls} />;
    case 'shipped': return <Truck className={cls} />;
    case 'delivered': return <CheckCircle className={cls} />;
    case 'cancelled': return <Ban className={cls} />;
    default: return <Clock className={cls} />;
  }
}

function OrderStatus(s: string): Order['status'] {
  return s as Order['status'];
}

export function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'products' | 'orders' | 'messages'>('products');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: 'wallets',
    price: '',
    stock: '',
    image_url: '',
  });
  const [imageMode, setImageMode] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [p, o, m] = await Promise.all([api.getProducts(), api.getOrders(), api.getMessages()]);
      setProducts(p);
      setOrders(o);
      setMessages(m);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchData();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.updateOrderStatus(id, status);
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: OrderStatus(status) } : o)));
    } catch {
      alert('Failed to update status');
    }
  };

  const markRead = async (id: string) => {
    try {
      await api.markMessageRead(id);
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    } catch {
      alert('Failed to mark as read');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete product');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock, 10);

    let imageUrl = newProduct.image_url.trim();
    if (imageMode === 'file') {
      if (!selectedFile) {
        setFormError('Please select an image file to upload.');
        return;
      }
      setUploading(true);
      try {
        imageUrl = await uploadProductImage(selectedFile);
      } catch (err: any) {
        setFormError(err.message || 'Failed to upload image.');
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    if (!newProduct.name.trim() || !newProduct.description.trim() || !imageUrl || isNaN(price) || isNaN(stock)) {
      setFormError('Please fill in all fields with valid values.');
      return;
    }
    setSaving(true);
    try {
      const product = await api.createProduct({
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        category: newProduct.category,
        price,
        stock,
        image_url: imageUrl,
      });
      setProducts([product, ...products]);
      setNewProduct({ name: '', description: '', category: 'wallets', price: '', stock: '', image_url: '' });
      setSelectedFile(null);
      setImageMode('url');
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to create product.');
    } finally {
      setSaving(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-8 w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <Package className="w-6 h-6 text-gold-300" />
            <h1 className="font-display text-xl font-700 text-cream-300">Admin Dashboard</h1>
          </div>
          <p className="font-body text-sm text-cream-500/60 mb-5">Enter password to access the dashboard.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 mb-5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
            placeholder="Password"
          />
          <button type="submit" className="w-full bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 py-3.5 rounded-sm transition-colors tracking-wide text-sm">
            Sign In
          </button>
          <p className="font-body text-xs text-cream-500/30 mt-4 text-center">Hint: admin123</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl font-700 text-cream-300 flex items-center gap-2.5">
            <Package className="w-6 h-6 text-gold-300" /> Admin Dashboard
          </h1>
          <div className="flex bg-dark-300 rounded-sm border border-dark-200/50">
            {(['products', 'orders', 'messages'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`font-body px-5 py-2.5 text-sm font-500 rounded-sm transition-colors ${
                  tab === t
                    ? 'bg-gold-300 text-dark-600'
                    : 'text-cream-500/60 hover:text-cream-300'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
                {t === 'orders' && ` (${orders.length})`}
                {t === 'messages' && ` (${messages.filter((m) => !m.is_read).length} new)`}
                {t === 'products' && ` (${products.length})`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border border-gold-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tab === 'products' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="font-body text-sm text-cream-500/60">
                Manage your product catalog. Add new items or remove existing ones.
              </p>
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 px-5 py-2.5 rounded-sm transition-colors text-sm tracking-wide"
              >
                {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleCreateProduct} className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-6 space-y-5">
                <h2 className="font-display text-lg font-600 text-cream-300 mb-2">Add New Product</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Product Name</label>
                    <input
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="Tactical Leather Wallet"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50"
                    >
                      <option value="wallets">Wallets</option>
                      <option value="belts">Belts</option>
                      <option value="knives">Knives</option>
                      <option value="batons">Batons</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm text-cream-500/70 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 resize-none placeholder:text-cream-500/25"
                    placeholder="Premium full-grain leather wallet with RFID blocking..."
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Price ($)</label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="89.99"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Stock</label>
                    <input
                      required
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm text-cream-500/70 mb-2">Image</label>
                  <div className="flex bg-dark-400 rounded-sm border border-dark-200/50 p-1 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageMode('url')}
                      className={`flex-1 flex items-center justify-center gap-2 font-body text-sm py-2.5 rounded-sm transition-colors ${
                        imageMode === 'url'
                          ? 'bg-gold-300 text-dark-600 font-600'
                          : 'text-cream-500/50 hover:text-cream-300'
                      }`}
                    >
                      <Link className="w-4 h-4" /> Image URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode('file')}
                      className={`flex-1 flex items-center justify-center gap-2 font-body text-sm py-2.5 rounded-sm transition-colors ${
                        imageMode === 'file'
                          ? 'bg-gold-300 text-dark-600 font-600'
                          : 'text-cream-500/50 hover:text-cream-300'
                      }`}
                    >
                      <Upload className="w-4 h-4" /> Upload File
                    </button>
                  </div>

                  {imageMode === 'url' ? (
                    <div className="relative">
                      <Link className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500/30" />
                      <input
                        required={imageMode === 'url'}
                        type="url"
                        value={newProduct.image_url}
                        onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                        className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm pl-10 pr-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                        placeholder="https://images.pexels.com/photos/..."
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setSelectedFile(file);
                            if (file) {
                              setNewProduct({ ...newProduct, image_url: '' });
                            }
                          }}
                          className="hidden"
                          id="product-image-upload"
                        />
                        <label
                          htmlFor="product-image-upload"
                          className="flex items-center justify-center gap-2 w-full bg-dark-400 border border-dark-200/50 hover:border-gold-300/50 text-cream-300 font-body rounded-sm px-4 py-3.5 cursor-pointer transition-colors"
                        >
                          {selectedFile ? (
                            <>
                              <ImageIcon className="w-4 h-4 text-gold-300" />
                              <span className="text-sm">{selectedFile.name}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-cream-500/50" />
                              <span className="text-sm text-cream-500/50">Click to select an image</span>
                            </>
                          )}
                        </label>
                        {selectedFile && (
                          <button
                            type="button"
                            onClick={() => setSelectedFile(null)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500/40 hover:text-red-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {selectedFile && (
                        <div className="bg-dark-400 border border-dark-200/50 rounded-sm p-2 flex justify-center">
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Preview"
                            className="h-40 object-contain rounded-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {formError && <p className="font-body text-red-500/80 text-sm">{formError}</p>}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 disabled:bg-dark-300 text-dark-600 font-body font-600 px-6 py-3 rounded-sm transition-colors text-sm tracking-wide"
                  >
                    {saving || uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {uploading ? 'Uploading Image...' : saving ? 'Saving...' : 'Save Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="inline-flex items-center gap-2 border border-dark-200/50 hover:border-cream-500/30 text-cream-500/60 hover:text-cream-300 font-body font-500 px-6 py-3 rounded-sm transition-colors text-sm"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-dark-300/50 border border-dark-300/50 rounded-sm overflow-hidden group">
                  <div className="relative aspect-[4/3] bg-dark-400 overflow-hidden">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-dark-600/0 group-hover:bg-dark-600/30 transition-all flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-500 text-cream-300 p-2.5 rounded-sm transition-all"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="absolute top-3 left-3 bg-dark-600/80 text-cream-400 text-[11px] font-600 uppercase tracking-wider px-3 py-1.5 rounded-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-600 text-lg text-cream-300 truncate">{product.name}</h3>
                    <p className="font-body text-sm text-cream-500/60 mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-dark-300/50">
                      <span className="font-display text-xl font-700 text-gold-300">${product.price.toFixed(2)}</span>
                      <span className="font-body text-xs text-cream-500/40">{product.stock} in stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products.length === 0 && (
              <div className="text-center py-16 font-body text-cream-500/40">
                No products in your catalog yet.
              </div>
            )}
          </div>
        ) : tab === 'orders' ? (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 font-body text-cream-500/40">No orders yet.</div>
            ) : (
              <div className="grid gap-4">
                {orders.map((order) => {
                  const cfg = statusConfig[order.status] || statusConfig.pending;
                  return (
                    <div key={order.id} className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div>
                          <p className="font-body text-xs text-cream-500/40 uppercase tracking-wider">Order ID</p>
                          <p className="font-body text-sm font-mono text-cream-300">{order.id.slice(0, 8)}...</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={order.status} />
                          <span className={`font-body text-sm font-600 ${cfg.color}`}>{cfg.label}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-sm font-700 text-cream-300">${Number(order.total_amount).toFixed(2)}</p>
                          <p className="font-body text-xs text-cream-500/40">{new Date(order.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3 mb-4">
                        <div className="bg-dark-400 rounded-sm p-3 border border-dark-200/30">
                          <p className="font-body text-xs text-cream-500/40 uppercase tracking-wider">Customer</p>
                          <p className="font-body text-sm text-cream-300 font-500">{order.customer_name}</p>
                        </div>
                        <div className="bg-dark-400 rounded-sm p-3 border border-dark-200/30">
                          <p className="font-body text-xs text-cream-500/40 uppercase tracking-wider">Email</p>
                          <p className="font-body text-sm text-cream-300 font-500">{order.customer_email}</p>
                        </div>
                        <div className="bg-dark-400 rounded-sm p-3 border border-dark-200/30">
                          <p className="font-body text-xs text-cream-500/40 uppercase tracking-wider">Phone</p>
                          <p className="font-body text-sm text-cream-300 font-500">{order.customer_phone || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-body text-xs text-cream-500/40 uppercase tracking-wider">Update:</span>
                        {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateStatus(order.id, s)}
                            className={`font-body px-3 py-1 text-xs font-500 rounded-sm border transition-colors ${
                              order.status === s
                                ? 'bg-gold-300/15 border-gold-300/50 text-gold-300'
                                : 'bg-dark-400 border-dark-200/30 text-cream-500/40 hover:text-cream-300'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 font-body text-cream-500/40">No messages yet.</div>
            ) : (
              <div className="grid gap-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`bg-dark-300/50 border rounded-sm p-5 ${msg.is_read ? 'border-dark-300/50' : 'border-gold-300/20'}`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <Mail className="w-4 h-4 text-cream-500/40" />
                        <span className="font-body text-sm font-600 text-cream-300">{msg.name}</span>
                        <span className="font-body text-xs text-cream-500/40">{msg.email}</span>
                        {!msg.is_read && (
                          <span className="bg-gold-300/15 text-gold-300 font-body text-xs font-500 px-2 py-0.5 rounded-sm">New</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-body text-xs text-cream-500/40">{new Date(msg.created_at).toLocaleString()}</span>
                        {!msg.is_read && (
                          <button onClick={() => markRead(msg.id)} className="font-body text-xs text-gold-300 hover:text-gold-400 flex items-center gap-1 transition-colors">
                            <Eye className="w-3 h-3" /> Mark read
                          </button>
                        )}
                        {msg.is_read && (
                          <span className="font-body text-xs text-green-600 flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Read
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-body text-sm font-600 text-cream-300 mb-1">{msg.subject}</h3>
                    <p className="font-body text-sm text-cream-500/70 leading-relaxed">{msg.content}</p>
                    {msg.phone && (
                      <p className="font-body text-xs text-cream-500/40 mt-2">Phone: {msg.phone}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
