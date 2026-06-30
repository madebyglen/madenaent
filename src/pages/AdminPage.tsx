import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { uploadProductImage } from '../lib/supabase';
import { Product, Order, Message } from '../types';
import {
  Package, Mail, CheckCircle, Clock, Truck, Ban, Eye, EyeOff,
<<<<<<< HEAD
  Plus, Trash2, Save, X, ImageIcon, Loader2, Upload, Link
=======
  Plus, Trash2, Save, X, ImageIcon, Loader2, Upload, Link, Pencil
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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

<<<<<<< HEAD
=======
type ImageMode = 'url' | 'file';

interface ProductFormFields {
  name: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  image_url: string;
}

const EMPTY_FORM: ProductFormFields = {
  name: '', description: '', category: 'wallets', price: '', stock: '', image_url: '',
};

function ImageField({
  imageMode, setImageMode, imageUrl, setImageUrl, selectedFile, setSelectedFile,
}: {
  imageMode: ImageMode;
  setImageMode: (m: ImageMode) => void;
  imageUrl: string;
  setImageUrl: (u: string) => void;
  selectedFile: File | null;
  setSelectedFile: (f: File | null) => void;
}) {
  return (
    <div>
      <label className="block font-body text-sm text-cream-500/70 mb-2">Image</label>
      <div className="flex bg-dark-400 rounded-sm border border-dark-200/50 p-1 mb-3">
        <button
          type="button"
          onClick={() => setImageMode('url')}
          className={`flex-1 flex items-center justify-center gap-2 font-body text-sm py-2.5 rounded-sm transition-colors ${
            imageMode === 'url' ? 'bg-gold-300 text-dark-600 font-600' : 'text-cream-500/50 hover:text-cream-300'
          }`}
        >
          <Link className="w-4 h-4" /> Image URL
        </button>
        <button
          type="button"
          onClick={() => setImageMode('file')}
          className={`flex-1 flex items-center justify-center gap-2 font-body text-sm py-2.5 rounded-sm transition-colors ${
            imageMode === 'file' ? 'bg-gold-300 text-dark-600 font-600' : 'text-cream-500/50 hover:text-cream-300'
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
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
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
              onChange={(e) => { setSelectedFile(e.target.files?.[0] || null); setImageUrl(''); }}
              className="hidden"
              id="product-image-upload"
            />
            <label
              htmlFor="product-image-upload"
              className="flex items-center justify-center gap-2 w-full bg-dark-400 border border-dark-200/50 hover:border-gold-300/50 text-cream-300 font-body rounded-sm px-4 py-3.5 cursor-pointer transition-colors"
            >
              {selectedFile ? (
                <><ImageIcon className="w-4 h-4 text-gold-300" /><span className="text-sm">{selectedFile.name}</span></>
              ) : (
                <><Upload className="w-4 h-4 text-cream-500/50" /><span className="text-sm text-cream-500/50">Click to select an image</span></>
              )}
            </label>
            {selectedFile && (
              <button type="button" onClick={() => setSelectedFile(null)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-500/40 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {selectedFile && (
            <div className="bg-dark-400 border border-dark-200/50 rounded-sm p-2 flex justify-center">
              <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-40 object-contain rounded-sm" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
export function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'products' | 'orders' | 'messages'>('products');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
<<<<<<< HEAD
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
=======

  // Add form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<ProductFormFields>(EMPTY_FORM);
  const [addImageMode, setAddImageMode] = useState<ImageMode>('url');
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addSaving, setAddSaving] = useState(false);
  const [addUploading, setAddUploading] = useState(false);
  const [addError, setAddError] = useState('');

  // Edit modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<ProductFormFields>(EMPTY_FORM);
  const [editImageMode, setEditImageMode] = useState<ImageMode>('url');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const [editError, setEditError] = useState('');
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d

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

<<<<<<< HEAD
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
=======
  useEffect(() => { if (authenticated) fetchData(); }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setAuthenticated(true);
    else alert('Incorrect password');
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.updateOrderStatus(id, status);
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: OrderStatus(status) } : o)));
<<<<<<< HEAD
    } catch {
      alert('Failed to update status');
    }
=======
    } catch { alert('Failed to update status'); }
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
  };

  const markRead = async (id: string) => {
    try {
      await api.markMessageRead(id);
      setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
<<<<<<< HEAD
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
=======
    } catch { alert('Failed to mark as read'); }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch { alert('Failed to delete product'); }
  };

  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image_url: product.image_url,
    });
    setEditImageMode('url');
    setEditFile(null);
    setEditError('');
  };

  const resolveImage = async (
    imageMode: ImageMode,
    file: File | null,
    imageUrl: string,
    setUploading: (v: boolean) => void,
    setError: (v: string) => void,
  ): Promise<string | null> => {
    if (imageMode === 'file') {
      if (!file) { setError('Please select an image file.'); return null; }
      setUploading(true);
      try {
        return await uploadProductImage(file);
      } catch (err: any) {
        setError(err.message || 'Upload failed.');
        return null;
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
      } finally {
        setUploading(false);
      }
    }
<<<<<<< HEAD

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
=======
    return imageUrl.trim();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    const price = parseFloat(addForm.price);
    const stock = parseInt(addForm.stock, 10);
    const imageUrl = await resolveImage(addImageMode, addFile, addForm.image_url, setAddUploading, setAddError);
    if (imageUrl === null) return;
    if (!addForm.name.trim() || !addForm.description.trim() || !imageUrl || isNaN(price) || isNaN(stock)) {
      setAddError('Please fill in all fields with valid values.');
      return;
    }
    setAddSaving(true);
    try {
      const product = await api.createProduct({
        name: addForm.name.trim(),
        description: addForm.description.trim(),
        category: addForm.category,
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
        price,
        stock,
        image_url: imageUrl,
      });
      setProducts([product, ...products]);
<<<<<<< HEAD
      setNewProduct({ name: '', description: '', category: 'wallets', price: '', stock: '', image_url: '' });
      setSelectedFile(null);
      setImageMode('url');
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to create product.');
    } finally {
      setSaving(false);
=======
      setAddForm(EMPTY_FORM);
      setAddFile(null);
      setAddImageMode('url');
      setShowAddForm(false);
    } catch (err: any) {
      setAddError(err.message || 'Failed to create product.');
    } finally {
      setAddSaving(false);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setEditError('');
    const price = parseFloat(editForm.price);
    const stock = parseInt(editForm.stock, 10);
    if (!editForm.name.trim() || !editForm.description.trim() || isNaN(price) || isNaN(stock)) {
      setEditError('Please fill in all required fields.');
      return;
    }
    let imageUrl = editForm.image_url.trim();
    if (editImageMode === 'file') {
      const uploaded = await resolveImage('file', editFile, '', setEditUploading, setEditError);
      if (uploaded === null) return;
      imageUrl = uploaded;
    }
    if (!imageUrl) { setEditError('An image URL or file is required.'); return; }
    setEditSaving(true);
    try {
      const updated = await api.updateProduct(editingProduct.id, {
        name: editForm.name.trim(),
        description: editForm.description.trim(),
        category: editForm.category,
        price,
        stock,
        image_url: imageUrl,
      });
      setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
      setEditingProduct(null);
    } catch (err: any) {
      setEditError(err.message || 'Failed to update product.');
    } finally {
      setEditSaving(false);
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 mb-5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
            placeholder="Password"
          />
          <button type="submit" className="w-full bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 py-3.5 rounded-sm transition-colors tracking-wide text-sm">
            Sign In
          </button>
=======
            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 mb-5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
            placeholder="Password"
          />
          <button type="submit" className="w-full bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 py-3.5 rounded-sm transition-colors tracking-wide text-sm">Sign In</button>
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
          <p className="font-body text-xs text-cream-500/30 mt-4 text-center">Hint: admin123</p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 py-8">
<<<<<<< HEAD
=======
      {/* ── Edit Modal ── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="absolute inset-0 bg-dark-700/80 backdrop-blur-sm" onClick={() => setEditingProduct(null)} />
          <form
            onSubmit={handleEditProduct}
            className="relative bg-dark-500 border border-dark-300/50 rounded-sm w-full max-w-2xl shadow-2xl space-y-5 p-7 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-display text-xl font-700 text-cream-300">Edit Product</h2>
              <button type="button" onClick={() => setEditingProduct(null)} className="p-2 text-cream-500/40 hover:text-cream-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Product Name</label>
                <input
                  required value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Category</label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
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
                required rows={3} value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Price ($)</label>
                <input
                  required type="number" step="0.01" min="0" value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Stock</label>
                <input
                  required type="number" min="0" value={editForm.stock}
                  onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                  className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50"
                />
              </div>
            </div>

            <ImageField
              imageMode={editImageMode}
              setImageMode={setEditImageMode}
              imageUrl={editForm.image_url}
              setImageUrl={(u) => setEditForm({ ...editForm, image_url: u })}
              selectedFile={editFile}
              setSelectedFile={setEditFile}
            />

            {editError && <p className="font-body text-red-500/80 text-sm">{editError}</p>}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={editSaving || editUploading}
                className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 disabled:bg-dark-300 text-dark-600 font-body font-600 px-7 py-3 rounded-sm transition-colors text-sm tracking-wide"
              >
                {editSaving || editUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editUploading ? 'Uploading...' : editSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button" onClick={() => setEditingProduct(null)}
                className="inline-flex items-center gap-2 border border-dark-200/50 hover:border-cream-500/30 text-cream-500/60 hover:text-cream-300 font-body font-500 px-6 py-3 rounded-sm transition-colors text-sm"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-display text-2xl font-700 text-cream-300 flex items-center gap-2.5">
            <Package className="w-6 h-6 text-gold-300" /> Admin Dashboard
          </h1>
          <div className="flex bg-dark-300 rounded-sm border border-dark-200/50">
            {(['products', 'orders', 'messages'] as const).map((t) => (
              <button
<<<<<<< HEAD
                key={t}
                onClick={() => setTab(t)}
                className={`font-body px-5 py-2.5 text-sm font-500 rounded-sm transition-colors ${
                  tab === t
                    ? 'bg-gold-300 text-dark-600'
                    : 'text-cream-500/60 hover:text-cream-300'
                }`}
=======
                key={t} onClick={() => setTab(t)}
                className={`font-body px-5 py-2.5 text-sm font-500 rounded-sm transition-colors ${tab === t ? 'bg-gold-300 text-dark-600' : 'text-cream-500/60 hover:text-cream-300'}`}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
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
=======
              <p className="font-body text-sm text-cream-500/60">Manage your product catalog. Add, edit, or remove items.</p>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 px-5 py-2.5 rounded-sm transition-colors text-sm tracking-wide"
              >
                {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showAddForm ? 'Cancel' : 'Add Product'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddProduct} className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-6 space-y-5">
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                <h2 className="font-display text-lg font-600 text-cream-300 mb-2">Add New Product</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Product Name</label>
                    <input
<<<<<<< HEAD
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
=======
                      required value={addForm.name}
                      onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="Tactical Leather Wallet"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Category</label>
                    <select
<<<<<<< HEAD
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
=======
                      value={addForm.category}
                      onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
=======
                    required rows={3} value={addForm.description}
                    onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                    className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 resize-none placeholder:text-cream-500/25"
                    placeholder="Premium full-grain leather wallet with RFID blocking..."
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Price ($)</label>
                    <input
<<<<<<< HEAD
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
=======
                      required type="number" step="0.01" min="0" value={addForm.price}
                      onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="89.99"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Stock</label>
                    <input
<<<<<<< HEAD
                      required
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
=======
                      required type="number" min="0" value={addForm.stock}
                      onChange={(e) => setAddForm({ ...addForm, stock: e.target.value })}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 placeholder:text-cream-500/25"
                      placeholder="10"
                    />
                  </div>
                </div>
<<<<<<< HEAD

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
=======
                <ImageField
                  imageMode={addImageMode} setImageMode={setAddImageMode}
                  imageUrl={addForm.image_url} setImageUrl={(u) => setAddForm({ ...addForm, image_url: u })}
                  selectedFile={addFile} setSelectedFile={setAddFile}
                />
                {addError && <p className="font-body text-red-500/80 text-sm">{addError}</p>}
                <div className="flex gap-3">
                  <button
                    type="submit" disabled={addSaving || addUploading}
                    className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 disabled:bg-dark-300 text-dark-600 font-body font-600 px-6 py-3 rounded-sm transition-colors text-sm tracking-wide"
                  >
                    {addSaving || addUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {addUploading ? 'Uploading Image...' : addSaving ? 'Saving...' : 'Save Product'}
                  </button>
                  <button
                    type="button" onClick={() => setShowAddForm(false)}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
                    <div className="absolute inset-0 bg-dark-600/0 group-hover:bg-dark-600/30 transition-all flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="opacity-0 group-hover:opacity-100 bg-red-500/80 hover:bg-red-500 text-cream-300 p-2.5 rounded-sm transition-all"
=======
                    <div className="absolute inset-0 bg-dark-600/0 group-hover:bg-dark-600/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openEdit(product)}
                        className="bg-gold-300/90 hover:bg-gold-300 text-dark-600 p-2.5 rounded-sm transition-all"
                        title="Edit product"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500/80 hover:bg-red-500 text-cream-300 p-2.5 rounded-sm transition-all"
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
                      <span className="font-body text-xs text-cream-500/40">{product.stock} in stock</span>
=======
                      <div className="flex items-center gap-3">
                        <span className="font-body text-xs text-cream-500/40">{product.stock} in stock</span>
                        <button
                          onClick={() => openEdit(product)}
                          className="font-body text-xs text-gold-300 hover:text-gold-400 flex items-center gap-1 transition-colors"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                      </div>
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products.length === 0 && (
<<<<<<< HEAD
              <div className="text-center py-16 font-body text-cream-500/40">
                No products in your catalog yet.
              </div>
            )}
          </div>
=======
              <div className="text-center py-16 font-body text-cream-500/40">No products in your catalog yet.</div>
            )}
          </div>

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
                            key={s}
                            onClick={() => updateStatus(order.id, s)}
=======
                            key={s} onClick={() => updateStatus(order.id, s)}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
=======

>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
<<<<<<< HEAD
                    {msg.phone && (
                      <p className="font-body text-xs text-cream-500/40 mt-2">Phone: {msg.phone}</p>
                    )}
=======
                    {msg.phone && <p className="font-body text-xs text-cream-500/40 mt-2">Phone: {msg.phone}</p>}
>>>>>>> 74b76218005a7641fa1236615cb473faf5b41b3d
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
