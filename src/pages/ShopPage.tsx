import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Category, Product } from '../types';
import { api } from '../lib/api';
import { useStore } from '../store';
import { Search } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  all: 'All Products',
  wallets: 'Wallets',
  belts: 'Belts',
  knives: 'Knives',
  batons: 'Batons',
};

export function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const selectedCategory = useStore((s) => s.selectedCategory);
  const setCategory = useStore((s) => s.setCategory);

  useEffect(() => {
    setLoading(true);
    api
      .getProducts(selectedCategory === 'all' ? undefined : selectedCategory)
      .then((d) => {
        setProducts(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCategory]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-dark-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-body text-gold-300 text-sm font-600 tracking-[0.2em] uppercase mb-2">Our Collection</p>
            <h1 className="font-display text-3xl md:text-4xl font-700 text-cream-300">{categoryLabels[selectedCategory]}</h1>
            <p className="font-body text-sm text-cream-500/60 mt-2">{filtered.length} products available</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-500/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-dark-300 border border-dark-200/50 text-cream-300 font-body text-sm rounded-sm pl-10 pr-4 py-3 w-64 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/30"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {(['all', 'wallets', 'belts', 'knives', 'batons'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`font-body px-5 py-2.5 rounded-sm text-sm font-500 tracking-wide transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-300 text-dark-600'
                  : 'bg-dark-300 text-cream-500/60 hover:text-cream-300 hover:border-gold-300/30 border border-transparent'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border border-gold-300 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-cream-500/40">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
