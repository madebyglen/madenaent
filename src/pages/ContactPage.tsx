import { useState } from 'react';
import { api } from '../lib/api';
import { Mail, Send, CheckCircle, Phone, MapPin } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.createMessage(form);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', content: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-500 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-body text-gold-300 text-sm font-600 tracking-[0.2em] uppercase mb-3">Contact Us</p>
          <h1 className="font-display text-3xl md:text-4xl font-700 text-cream-300 mb-3">Get in Touch</h1>
          <p className="font-body text-cream-500/70 max-w-lg mx-auto leading-relaxed">
            Have questions about our gear or need a custom order? Drop us a message and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-5">
              <Mail className="w-5 h-5 text-gold-300 mb-3" />
              <p className="font-body text-xs text-cream-500/50 uppercase tracking-wider mb-1">Email</p>
              <p className="font-body text-sm text-cream-300 font-500">support@edcforge.com</p>
            </div>
            <div className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-5">
              <Phone className="w-5 h-5 text-gold-300 mb-3" />
              <p className="font-body text-xs text-cream-500/50 uppercase tracking-wider mb-1">Phone</p>
              <p className="font-body text-sm text-cream-300 font-500">+1 (555) 123-4567</p>
            </div>
            <div className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-5">
              <MapPin className="w-5 h-5 text-gold-300 mb-3" />
              <p className="font-body text-xs text-cream-500/50 uppercase tracking-wider mb-1">Location</p>
              <p className="font-body text-sm text-cream-300 font-500">Austin, Texas, USA</p>
            </div>
          </div>

          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-10 text-center">
                <div className="w-14 h-14 bg-gold-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-gold-300" />
                </div>
                <h2 className="font-display text-xl font-700 text-cream-300 mb-2">Message Sent</h2>
                <p className="font-body text-cream-500/70 text-sm">We'll get back to you shortly.</p>
                <button onClick={() => setSent(false)} className="mt-5 font-body text-gold-300 hover:text-gold-400 text-sm font-500 transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-dark-300/50 border border-dark-300/50 rounded-sm p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Name</label>
                    <input
                      required type="text" value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-cream-500/70 mb-2">Email</label>
                    <input
                      required type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-sm text-cream-500/70 mb-2">Phone (optional)</label>
                  <input
                    type="tel" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-cream-500/70 mb-2">Subject</label>
                  <input
                    required type="text" value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors placeholder:text-cream-500/25"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block font-body text-sm text-cream-500/70 mb-2">Message</label>
                  <textarea
                    required rows={5} value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full bg-dark-400 border border-dark-200/50 text-cream-300 font-body rounded-sm px-4 py-3.5 focus:outline-none focus:border-gold-300/50 transition-colors resize-none placeholder:text-cream-500/25"
                    placeholder="Describe your inquiry..."
                  />
                </div>
                {error && <p className="font-body text-red-500/80 text-sm">{error}</p>}
                <button
                  type="submit" disabled={loading}
                  className="w-full bg-gold-300 hover:bg-gold-400 disabled:bg-dark-300 text-dark-600 font-body font-600 py-3.5 rounded-sm transition-colors flex items-center justify-center gap-2 tracking-wide text-sm"
                >
                  <Send className="w-4 h-4" />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
