import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-dark-300/50 bg-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="font-display font-700 text-xl text-cream-300 tracking-tight">
                EDC<span className="text-gold-300">Forge</span>
              </span>
            </Link>
            <p className="font-body text-sm text-cream-500/70 max-w-sm leading-relaxed">
              Premium tactical gear for the discerning professional. Every piece is crafted with precision and built to last a lifetime.
            </p>
          </div>
          <div>
            <h4 className="font-display font-600 text-sm text-cream-300 uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {['Wallets', 'Belts', 'Knives', 'Batons'].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="font-body text-sm text-cream-500/60 hover:text-gold-300 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-600 text-sm text-cream-300 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Contact', 'Admin'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
                    className="font-body text-sm text-cream-500/60 hover:text-gold-300 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-300/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-500/40">
            © 2026 EDC Forge. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-cream-500/40">
            <Shield className="w-3 h-3" />
            <span className="font-body text-xs">Secure & Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
