import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      {/* Background hero image */}
      <div className="absolute inset-1">
        <img
          src="https://images.pexels.com/photos/163827/pexels-photo-163827.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="EDC gear"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-600/80" />
        <div className="absolute inset-1 bg-gradient-to-r from-dark-600 via-dark-600/70 to-transparent" />
        <div className="absolute inset-1 bg-gradient-to-t from-dark-500 via-transparent to-dark-600/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="font-body text-gold-300 text-sm font-600 tracking-[0.2em] uppercase mb-4">
            Handcrafted Tactical Gear
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-700 text-cream-300 leading-[1.1] mb-6">
            Built for Those Who
            <span className="text-gold-300"> Demand More</span>
          </h1>
          <p className="font-body text-lg text-cream-500 leading-relaxed mb-10 max-w-xl">
            Wallets, belts, knives, and batons — each piece forged with precision for the discerning professional who values craft over compromise.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-gold-300 hover:bg-gold-400 text-dark-600 font-body font-600 px-8 py-3.5 rounded-sm transition-colors tracking-wide text-sm"
            >
              Browse Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-cream-500/30 hover:border-gold-300/60 text-cream-300 font-body font-500 px-8 py-3.5 rounded-sm transition-colors tracking-wide text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
