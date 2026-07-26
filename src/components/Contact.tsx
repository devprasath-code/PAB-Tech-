import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, Check, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to send message.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      // reset success state after 5s
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-neutral-950">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-brand-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-xs text-brand-purple font-mono uppercase tracking-widest">CONTACT US</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white leading-tight">
            Get in touch with our team. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">We're here to help!</span>
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed font-light mt-1">
            Whether you have a general question, need technical support, or want to inquire about custom solutions, we're just a message away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left: Contact Info and Business Hours */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide">
                Get In Touch
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Connect directly with our team for prompt support, engineering consultations, or business inquiries.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Phone</h4>
                  <a href="tel:+919600899402" className="text-sm text-white font-semibold hover:text-brand-cyan transition-colors mt-0.5 block">
                    +91 9600 899 402
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Email</h4>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <div className="text-xs">
                      <span className="text-neutral-400 font-light">General: </span>
                      <a href="mailto:info@pabtech.in" className="text-white font-medium hover:text-brand-purple transition-colors">info@pabtech.in</a>
                    </div>
                    <div className="text-xs">
                      <span className="text-neutral-400 font-light">Support: </span>
                      <a href="mailto:support@pabtech.in" className="text-white font-medium hover:text-brand-purple transition-colors">support@pabtech.in</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-neutral-900/40 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Business Hours</h4>
                  <div className="flex flex-col gap-1 mt-1 text-xs text-neutral-300 font-light">
                    <p><span className="font-semibold text-white">Monday - Friday:</span> 9:00 AM - 6:00 PM (PST)</p>
                    <p><span className="font-semibold text-white">Saturday:</span> 10:00 AM - 4:00 PM (PST)</p>
                    <p><span className="font-semibold text-white">Sunday:</span> Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-neutral-900/40 p-6 sm:p-8 rounded-2xl border border-white/5 backdrop-blur-sm text-left">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-brand-purple/50 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-brand-purple/50 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-brand-purple/50 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Subject *</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-brand-purple/50 focus:outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-neutral-950 border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 focus:border-brand-purple/50 focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[11px] text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-3 rounded-lg text-xs font-semibold tracking-wide text-white transition-all flex items-center justify-center gap-2 mt-2 ${
                  isSubmitted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-purple hover:opacity-90 active:scale-98 shadow-lg shadow-brand-purple/10 cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-white" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
