import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '../store';

export function Navbar({ onCartClick }: { onCartClick?: () => void }) {
  const cart = useStore((s) => s.cart);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  const nav = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-dark-500/90 backdrop-blur-md border-b border-dark-300/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="font-display font-700 text-xl text-cream-300 tracking-tight">
              Madena<span className="text-gold-300">Enterprises</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <Link
                key={n.path}
                to={n.path}
                className={`font-body text-sm font-500 tracking-wide transition-colors ${
                  isActive(n.path) ? 'text-gold-300' : 'text-cream-500 hover:text-cream-300'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onCartClick} className="relative p-2 text-cream-500 hover:text-gold-300 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-300 text-dark-600 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-cream-500" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-dark-300/50 px-4 py-3 space-y-2 bg-dark-500">
          {nav.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-500 py-2 ${isActive(n.path) ? 'text-gold-300' : 'text-cream-500'}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
