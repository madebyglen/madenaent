import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product } from '../types';
import { api } from '../lib/api';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then((d) => setProducts(d.slice(0, 3)));
  }, []);

  return (
    <div className="bg-dark-500">
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-body text-gold-300 text-sm font-600 tracking-[0.2em] uppercase mb-2">Curated Selection</p>
            <h2 className="font-display text-3xl md:text-4xl font-700 text-cream-300">Featured Products</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1 font-body text-gold-300 hover:text-gold-400 text-sm font-500 tracking-wide transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 font-body text-gold-300 hover:text-gold-400 text-sm font-500"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
