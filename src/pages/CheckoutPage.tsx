import { useState } from 'react';
import { useStore } from '../store';
import { api } from '../lib/api';
import { ArrowLeft, CheckCircle, Loader2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const total = useStore((s) => s.cartTotal());
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  if (cart.length === 0 && !done) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-cream-500/60">Your cart is empty.</p>
          <Link to="/shop" className="font-body text-gold-300 hover:text-gold-400 mt-3 inline-block text-sm transition-colors">Browse products</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createOrder({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone || undefined,
        items: cart.map((c) => ({
          product_id: c.product.id,
          quantity: c.quantity,
          price_at_time: c.product.price,
        })),
      });
      clearCart();
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-gold-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-gold-300" />
          </div>
          <h1 className="font-display text-3xl font-700 text-cream-300 mb-3">Order Placed</h1>
          <p className="font-body text-cream-500/70 mb-8">Thank you for your order. We'll get in touch shortly with confirmation details.</p>
          <Link to="/shop" className="inline-block bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 px-8 py-3.5 rounded-sm transition-colors text-sm tracking-wide">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-500 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-cream-500/60 hover:text-cream-300 mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue shopping
        </Link>
        <h1 className="font-display text-3xl font-700 text-cream-300 mb-10">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-lg font-600 text-cream-300 mb-6">Contact Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Full Name</label>
                <input
                  required type="text" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-dark-300 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Email</label>
                <input
                  required type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-dark-300 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block font-body text-sm text-cream-500/70 mb-2">Phone (optional)</label>
                <input
                  type="tel" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-dark-300 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                  placeholder="+1 234 567 890"
                />
              </div>
              {error && <p className="font-body text-red-500/80 text-sm">{error}</p>}
              <button
                type="submit" disabled={loading}
                className="w-full bg-gold-300 hover:bg-gold-400 disabled:bg-dark-300 text-dark-600 font-body font-600 py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 tracking-wide text-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
                {loading ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
          <div className="bg-dark-300/50 rounded-sm border border-dark-300/50 p-6">
            <h2 className="font-display text-lg font-600 text-cream-300 mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((c) => (
                <div key={c.product.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <img src={c.product.image_url} alt="" className="w-10 h-10 rounded-sm object-cover bg-dark-400" />
                    <div>
                      <p className="font-body text-cream-300 font-600">{c.product.name}</p>
                      <p className="font-body text-xs text-cream-500/50">Qty: {c.quantity}</p>
                    </div>
                  </div>
                  <span className="font-body text-cream-300 font-600">${(c.product.price * c.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dark-300/50 mt-6 pt-6 flex items-center justify-between">
              <span className="font-body text-cream-500/70">Total</span>
              <span className="font-display text-2xl font-700 text-gold-300">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
