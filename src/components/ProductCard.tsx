import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store';

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore((s) => s.addToCart);
  const categories: Record<string, string> = {
    wallets: 'Wallet',
    belts: 'Belt',
    knives: 'Knife',
    batons: 'Baton',
  };

  return (
    <div className="group bg-dark-300 border border-dark-200/50 hover:border-gold-300/30 rounded-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-900/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-400">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-dark-600/0 group-hover:bg-dark-600/20 transition-all duration-500 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <Link
            to={`/product/${product.id}`}
            className="bg-cream-300/90 hover:bg-cream-300 text-dark-600 p-3 rounded-sm transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addToCart({ product, quantity: 1 })}
            className="bg-gold-300 hover:bg-gold-400 text-dark-600 p-3 rounded-sm transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <span className="absolute top-3 left-3 bg-dark-600/80 backdrop-blur-sm text-cream-500 text-[11px] font-600 uppercase tracking-wider px-3 py-1.5 rounded-sm">
          {categories[product.category] || product.category}
        </span>
      </div>
      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block group/link">
          <h3 className="font-display font-600 text-lg text-cream-300 group-hover/link:text-gold-300 transition-colors duration-300 truncate">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-sm text-cream-500/70 mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-200/50">
          <span className="font-display text-xl font-700 text-gold-300">${product.price.toFixed(2)}</span>
          <span className={`font-body text-xs font-500 ${product.stock > 0 ? 'text-cream-500/60' : 'text-red-500/70'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  );
}
