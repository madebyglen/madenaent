import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cart = useStore((s) => s.cart);
  const remove = useStore((s) => s.removeFromCart);
  const update = useStore((s) => s.updateQuantity);
  const total = useStore((s) => s.cartTotal());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-dark-700/80 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-dark-500 border-l border-dark-300/50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-300/50">
          <h2 className="font-display text-lg font-700 text-cream-300 flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gold-300" /> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 text-cream-500/50 hover:text-cream-300 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-dark-300 mx-auto mb-4" />
              <p className="font-body text-cream-500/50">Your cart is empty.</p>
              <Link to="/shop" onClick={onClose} className="font-body text-gold-300 hover:text-gold-400 text-sm mt-3 inline-block transition-colors">
                Browse products
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex gap-4 bg-dark-300 rounded-sm p-3 border border-dark-200/50">
                <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 rounded-sm object-cover bg-dark-400" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-600 text-cream-300 truncate">{item.product.name}</h3>
                  <p className="font-body text-xs text-gold-300">${item.product.price.toFixed(2)} each</p>
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center bg-dark-400 rounded-sm border border-dark-200/50">
                      <button onClick={() => update(item.product.id, item.quantity - 1)} className="px-2.5 py-1 text-cream-500/50 hover:text-cream-300 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="px-3 text-xs text-cream-300 font-body font-600">{item.quantity}</span>
                      <button onClick={() => update(item.product.id, item.quantity + 1)} className="px-2.5 py-1 text-cream-500/50 hover:text-cream-300 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => remove(item.product.id)} className="text-red-500/70 hover:text-red-500 p-1 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-dark-300/50 p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-body text-sm text-cream-500/70">Subtotal</span>
              <span className="font-display text-xl font-700 text-cream-300">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 text-center py-3.5 rounded-sm transition-colors tracking-wide text-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
