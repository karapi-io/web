import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Mail, ArrowLeft, ShieldCheck, Zap, Code2,
  FileText, QrCode, Palette, Globe, Sparkles, Clock, Users, FileOutput
} from "lucide-react";
import { toast } from "sonner";

const ENDPOINT = "https://api.karapi.io/auth/apikey/request";

export default function GetApiKey() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setIsLoading(true);
      const r = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!r.ok) throw new Error();
      setIsSuccess(true);
      toast.success("API key sent to your email!");
    } catch {
      toast.error("Could not generate API key");
    } finally {
      setIsLoading(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is the free tier really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. 100 invoices per month forever." } },
      { "@type": "Question", "name": "Do you store invoice data?", "acceptedAnswer": { "@type": "Answer", "text": "No. Data is processed in memory and discarded." } },
      { "@type": "Question", "name": "Is this production ready?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Built for scale and reliability." } }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "karAPI",
    "description": "GST invoice generation API",
    "brand": { "@type": "Brand", "name": "karAPI" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const features = [
    { label: "GST & HSN Codes", icon: FileText, desc: "Auto-calculated taxes" },
    { label: "UPI QR Codes", icon: QrCode, desc: "Payment-ready invoices" },
    { label: "White Label", icon: Palette, desc: "Your branding" },
    { label: "Global Ready", icon: Globe, desc: "Multi-currency support" }
  ];

  const stats = [
    { value: "100", label: "Free invoices/mo", icon: FileText },
    { value: "<500ms", label: "Response time", icon: Clock },
    { value: "1000+", label: "Developers", icon: Users }
  ];

  const comparison = [
    ["GST logic", "✓", "✗"],
    ["QR codes", "✓", "✗"],
    ["API-first", "✓", "✗"],
    ["Setup time", "2 min", "2 days"]
  ];

  const testimonials = [
    { text: "Saved us weeks of dev time.", author: "Startup CTO" },
    { text: "Finally, GST made simple.", author: "SaaS Founder" },
    { text: "PDF generation solved.", author: "Dev Lead" },
    { text: "Perfect for SaaS billing.", author: "Product Manager" }
  ];

  return (
    <>
      <Helmet>
        <title>Get Free API Key | karAPI - GST Invoice API</title>
        <meta name="description" content="Get your free API key and start generating GST-compliant invoices via API. 100 free invoices/month. No credit card required." />
        <link rel="canonical" href="https://karapi.io/get-api-key" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col lg:flex-row bg-white">

        {/* LEFT PANEL - Form (Sticky) - WHITE THEME */}
        <div className="lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col relative overflow-hidden bg-white border-r border-slate-200">

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <Link
              to="/api-docs"
              className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
            >
              API Docs →
            </Link>
          </div>

          {/* Main content - Centered vertically and horizontally */}
          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 relative z-10">
            {/* Added mx-auto and removed lg:mx-0 to center the block */}
            <div className="max-w-md mx-auto w-full">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold mb-6"
              >
                <Sparkles size={14} />
                100% Free to Start
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight"
              >
                Generate GST invoices{" "}
                <span className="text-blue-600">
                  via API
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-slate-600 text-lg leading-relaxed mb-3">
                  Create PDFs, UPI QR codes, and GST-compliant invoices using JSON.
                </p>
                {/* Output formats added here */}
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 bg-slate-50 p-3 rounded-lg border border-slate-100 w-fit">
                  <FileOutput size={16} className="text-blue-600" />
                  <span>Output: PDF Binary / HTML / URL</span>
                </div>
              </motion.div>

              {!isSuccess ? (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onSubmit={submit}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dev@startup.com"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-slate-800 focus:ring-4 focus:ring-slate-100 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-slate-200"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating…
                      </>
                    ) : (
                      <>
                        Get API Key
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2">
                    100 free invoices/month. No credit card required.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-2xl p-8 border border-green-100 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Check your inbox!</h2>
                  <p className="text-green-800">{email}</p>
                  <Link
                    to="/api-docs"
                    className="inline-flex items-center gap-2 mt-6 text-green-700 hover:text-green-800 font-semibold transition-colors border-b border-green-200 hover:border-green-700 pb-0.5"
                  >
                    Read the docs <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )}

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-6 mt-8"
              >
                {[
                  { icon: ShieldCheck, label: "Secure", color: "text-slate-400" },
                  { icon: Zap, label: "Instant", color: "text-slate-400" },
                  { icon: Code2, label: "API-first", color: "text-slate-400" }
                ].map(({ icon: Icon, label, color }) => (
                  <span key={label} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Icon size={16} className={color} />
                    {label}
                  </span>
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mt-10 pt-10 border-t border-slate-100"
              >
                {stats.map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{value}</div>
                    <div className="text-xs text-slate-500 mt-1">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - UNCHANGED */}
        <div className="lg:w-1/2 bg-white px-6 md:px-12 lg:px-16 py-12 lg:py-16">
          <div className="max-w-lg mx-auto lg:mx-0 space-y-12">

            {/* Why karAPI */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Why karAPI?</h2>
              <p className="text-slate-600 text-lg">
                The easiest way to generate GST-compliant invoices via API. Built by developers, for developers.
              </p>
            </motion.section>

            {/* Features Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Everything included</h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map(({ label, icon: Icon, desc }) => (
                  <div
                    key={label}
                    className="group bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="font-semibold text-slate-900">{label}</div>
                    <div className="text-sm text-slate-500 mt-1">{desc}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Comparison Table */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">karAPI vs Manual</h3>
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-5 py-3 font-semibold text-slate-700">Feature</th>
                      <th className="text-center px-5 py-3 font-bold text-blue-600">karAPI</th>
                      <th className="text-center px-5 py-3 font-medium text-slate-400">Manual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100 hover:bg-white transition-colors">
                        <td className="px-5 py-3 text-slate-700 font-medium">{row[0]}</td>
                        <td className="px-5 py-3 text-center text-green-600 font-bold text-lg">{row[1]}</td>
                        <td className="px-5 py-3 text-center text-red-400">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What developers say</h3>
              <div className="grid grid-cols-2 gap-3">
                {testimonials.map(({ text, author }, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <p className="text-slate-700 font-medium mb-2">"{text}"</p>
                    <p className="text-xs text-slate-400">— {author}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-4">FAQ</h3>
              <div className="space-y-4 bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div>
                  <h4 className="font-semibold text-slate-900">Is it really free?</h4>
                  <p className="text-sm text-slate-600 mt-1">Yes. 100 invoices/month forever. No credit card required.</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900">Do you store my data?</h4>
                  <p className="text-sm text-slate-600 mt-1">No. All data is processed in memory and discarded immediately after generating the invoice.</p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900">Is this production ready?</h4>
                  <p className="text-sm text-slate-600 mt-1">Absolutely. Built for scale with 99.9% uptime SLA.</p>
                </div>
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">Generate your first invoice in under 2 minutes.</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg"
              >
                Get your free API key
              </button>
            </motion.section>

          </div>
        </div>

      </div>
    </>
  );
}