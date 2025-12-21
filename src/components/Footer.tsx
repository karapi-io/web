

import React from 'react';
import { FileText, Twitter, Linkedin, Github, Mail } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-[#0F172A] text-slate-400 py-16 px-6 md:px-12 lg:px-20 border-t border-slate-800">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><FileText size={20} className="text-white" /></div>
                        KarAPI
                    </div>
                    <p className="text-sm leading-relaxed mb-6">The developer-first invoicing engine for modern Indian businesses. Built for speed, privacy, and scale.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Product</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/gst-invoice-generator" className="hover:text-blue-400 transition-colors">Generator</Link></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Templates</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                        <li><Link to="/api-docs" className="hover:text-blue-400 transition-colors">API Docs</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Resources</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
                        <li><a href="#" className="hover:text-blue-400 transition-colors">Github Repo</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6">Legal</h4>
                    <ul className="space-y-4 text-sm">
                        <li><a href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="/terms-of-service" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                        <li><a href="/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</a></li>
                        <li><a href="mailto:support@karapi.io" className="hover:text-blue-400 transition-colors flex items-center gap-2"><Mail size={14} /> Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                <p>© 2025 KarAPI. All rights reserved.</p>
                <p>Made with ❤️ in India.</p>
            </div>
        </footer>

    );
}