import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { Product } from '../types';
import { api } from '../lib/api';
import { useStore } from '../store';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    if (!id) return;
    api.getProduct(id).then((p) => {
      setProduct(p);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="w-8 h-8 border border-gold-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-500 flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-cream-500/60">Product not found.</p>
          <Link to="/shop" className="font-body text-gold-300 hover:text-gold-400 mt-3 inline-block text-sm">Back to shop</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({ product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-dark-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 font-body text-cream-500/60 hover:text-cream-300 mb-8 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue shopping
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="rounded-sm overflow-hidden bg-dark-300 border border-dark-200/50">
            <img src={product.image_url} alt={product.name} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-body text-gold-300 text-xs font-600 tracking-[0.2em] uppercase">{product.category}</span>
            <h1 className="font-display text-3xl md:text-4xl font-700 text-cream-300 mt-3 leading-tight">{product.name}</h1>
            <p className="font-body text-cream-500/70 mt-5 leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-3xl font-700 text-gold-300">${product.price.toFixed(2)}</span>
              <span className={`font-body text-sm font-500 ${product.stock > 0 ? 'text-cream-500/50' : 'text-red-500/70'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center bg-dark-300 rounded-sm border border-dark-200/50">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3.5 text-cream-500/50 hover:text-cream-300 transition-colors"><Minus className="w-4 h-4" /></button>
                <span className="px-5 text-cream-300 font-body font-600 min-w-[3ch] text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3.5 text-cream-500/50 hover:text-cream-300 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <button
                onClick={handleAdd}
                disabled={product.stock <= 0}
                className={`flex-1 flex items-center justify-center gap-2 font-body font-600 px-8 py-3.5 rounded-sm transition-all tracking-wide text-sm ${
                  added
                    ? 'bg-green-700 text-cream-300'
                    : product.stock > 0
                    ? 'bg-gold-300 hover:bg-gold-400 text-dark-600'
                    : 'bg-dark-300 text-cream-500/30 cursor-not-allowed'
                }`}
              >
                {added ? <CheckCircle className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
