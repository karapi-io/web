import React, { useState, useEffect } from 'react';
import {
    Printer, Settings, User, ShoppingCart, ChevronDown, ChevronUp,
    Landmark, FileText, Upload, Plus, Trash2, RefreshCw,
    LayoutTemplate, Zap, Box, Shield, QrCode, Maximize2, Download, Percent, MessageSquare, HelpCircle
} from 'lucide-react';

import { INDIAN_STATES } from '../data/states';

// --- LIBRARIES FOR PDF GENERATION ---
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- IMPORTS ---
import type { InvoiceData, LineItem } from '../types/invoice';
import { TemplateVintage } from '../templates/TemplateVintage';
import { TemplateEcommerce } from '../templates/TemplateEcommerce';
import { TemplateService } from '../templates/TemplateService';
import { TemplateEvergreen } from '../templates/TemplateEvergreen';

// --- IMPORT CROPPER ---
import ImageCropper from '../components/ImageCropper';
import SupportWidget from '../components/supportWidget';


// --- TYPE EXTENSION ---
interface ExtendedInvoiceData extends InvoiceData {
    upiId?: string;
    logoStyle?: {
        zoom: number;
        fit: 'contain' | 'cover';
    };
}

// ==========================================
// 1. DEFAULT DATASETS
// ==========================================
const DEFAULTS_VINTAGE: ExtendedInvoiceData = { upiId: 'amazon@upi', invoiceNumber: 'INV-001', date: '2023-06-17', dueDate: '2023-06-17', placeOfSupply: '36-TELANGANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png', logoStyle: { zoom: 1, fit: 'contain' }, sellerName: 'TATA MOTORS LIMITED', sellerAddress: 'Nigadi Bhosari Road, PIMPRI\nPune, MAHARASHTRA, 411018', sellerGst: '27AAACT2727Q1ZW', sellerMobile: '9999999999', sellerEmail: 'accounts@tatamotors.com', isSellerGstRegistered: true, clientName: 'Natarajan Chandrasekaran', clientAddress: 'Survey 115/1, ISB Rd, Financial District\nGachibowli, Nanakramguda\nHyderabad, TELANGANA, 500032', clientGst: '', clientMobile: '9876543210', items: [{ id: '1', description: 'Tata Nexon EV Max', hsn: '87038070', quantity: 1, rate: 1450000.00 }, { id: '2', description: 'Accesories Kit (Floor Mats, Cover)', hsn: '87089900', quantity: 1, rate: 12500.00 },], currency: '₹', taxRate: 18, bankName: 'HDFC BANK', bankAccount: '50200012345678', bankIfsc: 'HDFC0001234', bankBranch: 'Indiranagar, Bangalore', notes: 'Thank you for your business.', terms: '1. Goods once sold cannot be taken back.\n2. Interest @24% p.a. will be charged for delayed payments.\n3. Subject to Pune Jurisdiction.', signatory: 'Authorized Signatory' };
const DEFAULTS_ECOMMERCE: ExtendedInvoiceData = { upiId: 'amazon@upi', invoiceNumber: 'INV-AMZ-2023', date: '2023-06-16', dueDate: '2023-06-16', placeOfSupply: '09-UTTAR PRADESH', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png', sellerName: 'Amazon Retail India Pvt Ltd', sellerAddress: 'Q-city, 2nd Floor, Gachibowli,\nHyderabad, TELANGANA, 500032', sellerGst: '26ADCDE3836R1ZQ', sellerMobile: '9999999999', sellerEmail: 'support@amazon.in', isSellerGstRegistered: true, clientName: 'Amit Agarwal', clientAddress: 'Babuganj, Hasanganj\nLucknow, UTTAR PRADESH, 226007', clientGst: '', clientMobile: '9876543210', items: [{ id: '1', description: 'Samsung Galaxy F23 (Aqua Green, 128GB)', hsn: '8517', quantity: 1, rate: 14405.93 }, { id: '2', description: 'Samsung 45 Watt Travel Adapter', hsn: '8504', quantity: 1, rate: 2117.80 },], currency: '₹', taxRate: 18, bankName: 'YES BANK', bankAccount: '66789999222445', bankIfsc: 'YESBBIN4567', bankBranch: 'Kodihalli', notes: 'Thank you for the Business', terms: '1. Goods once sold cannot be taken back or exchanged.\n2. We are not the manufacturers, company will stand for warranty as per their terms.', signatory: 'Authorized Signatory', logoStyle: { zoom: 1, fit: 'contain' } };
const DEFAULTS_SERVICE: ExtendedInvoiceData = { upiId: 'amazon@upi', invoiceNumber: 'INV-47', date: new Date().toISOString().split('T')[0], dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], placeOfSupply: '27-MAHARASHTRA', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/LTIMindtree_Logo.jpg', sellerName: 'LTIMindtree', sellerAddress: 'Edward Apartment, Evershine Nagar Road,\nMalad West, Mumbai, MAHARASHTRA, 400057', sellerGst: '27DMIHJ3051C3Z5', sellerMobile: '9999999999', sellerEmail: 'getswipe@gmail.com', isSellerGstRegistered: true, clientName: 'Rama Krishna Verma', clientAddress: 'Opposite Reliance Corporate Park, Gr, RCP Industrial Area,\nGhansoli, Thane Belapur Road, Navi Mumbai Thane 2\nMumbai, MAHARASHTRA, 400701', clientGst: '27AABCR1718E1ZP', clientMobile: '9999999999', items: [{ id: '1', description: 'Google Cloud Platform Integration', hsn: '998313', quantity: 1, rate: 500000.00 }, { id: '2', description: 'Application Modernization', hsn: '998313', quantity: 2, rate: 42372.88 }, { id: '3', description: 'Support & Maintenance', hsn: '998313', quantity: 1, rate: 21185.59 }, { id: '4', description: 'Consulting & Advisory', hsn: '998313', quantity: 1, rate: 65253.39 },], currency: '₹', taxRate: 18, bankName: 'ICICI', bankAccount: '66789999222445', bankIfsc: 'ICIC0016', bankBranch: 'Whitefield', notes: 'Thank you for the Business!', terms: '1. All invoices are payable within 15 days from the date of invoice.\n2. Late payments penalty of 2.5% interest per day on the outstanding balance.', signatory: 'Receiver\'s Signature', logoStyle: { zoom: 1, fit: 'contain' } };
const DEFAULTS_EVERGREEN: ExtendedInvoiceData = { upiId: 'amazon@upi', invoiceNumber: 'INV-ITC-099', date: '2023-09-27', dueDate: '2023-09-27', placeOfSupply: '27-MAHARASHTRA', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/ITC_Limited_Logo.svg', sellerName: 'ITC LIMITED', sellerAddress: 'Virginia House, 37 J. L. Nehru Road\nKolkata - 700071, West Bengal', sellerGst: '19AAACI5950L1ZA', sellerMobile: '9876543210', sellerEmail: 'accounts@itc.in', isSellerGstRegistered: true, clientName: 'Reliance Retail Ltd', clientAddress: 'Building 101, Reliance Corporate Park\nGhansoli, Navi Mumbai, 400701', clientGst: '27AABCR1718E1ZP', clientMobile: '9999999999', items: [{ id: '1', description: 'Aashirvaad Whole Wheat Atta 10kg', hsn: '1101', quantity: 50, rate: 420.00 }, { id: '2', description: 'Sunfeast Dark Fantasy Choco Fills', hsn: '1905', quantity: 100, rate: 35.50 }, { id: '3', description: 'Classmate Notebooks (Pack of 6)', hsn: '4820', quantity: 200, rate: 180.00 },], currency: '₹', taxRate: 18, bankName: 'HDFC BANK', bankAccount: '00001234567890', bankIfsc: 'HDFC0000123', bankBranch: 'Park Street, Kolkata', notes: 'Thank you for your business.', terms: '1. Payment due within 30 days.\n2. Goods once sold cannot be returned.\n3. Disputes subject to Kolkata jurisdiction.', signatory: 'Authorized Signatory', logoStyle: { zoom: 1, fit: 'contain' } };

// --- HELPER COMPONENTS ---
const ModernInput = ({ label, value, onChange, type = "text", placeholder = "", icon: Icon }: any) => (
    <div className="group">
        {label && <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider group-focus-within:text-blue-500 transition-colors">{label}</label>}
        <div className="relative">
            {Icon && <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />}
            <input type={type} value={value || ''} onChange={onChange} placeholder={placeholder} className={`w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-2.5 ${Icon ? 'pl-9' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm`} />
        </div>
    </div>
);

const ModernTextArea = ({ label, value, onChange, placeholder = "", height = "h-20" }: any) => (
    <div className="group">
        <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider group-focus-within:text-blue-500 transition-colors">{label}</label>
        <textarea value={value || ''} onChange={onChange} placeholder={placeholder} className={`w-full ${height} bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm resize-none`} />
    </div>
);

const TemplateCard = ({ id, active, label, icon: Icon, onClick }: any) => (
    <button onClick={() => onClick(id)} className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 group ${active ? 'bg-blue-50/50 border-blue-500 text-blue-700 shadow-md shadow-blue-500/10' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'}`}>
        <Icon size={20} className={`mb-2 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
        <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
        {active && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
    </button>
);

export default function GeneratorPage() {
    const [data, setData] = useState<ExtendedInvoiceData>(DEFAULTS_VINTAGE);
    const [activeTemplate, setActiveTemplate] = useState<'vintage' | 'ecommerce' | 'service' | 'evergreen'>('vintage');
    const [activeSection, setActiveSection] = useState<string>('items');
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // --- UX STATES ---
    const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor'); // For Mobile Tabs

    // --- CROPPER STATE ---
    const [isCropping, setIsCropping] = useState(false);
    const [pendingImage, setPendingImage] = useState<string | null>(null);

    // --- AUTO-SAVE LOGIC ---
    useEffect(() => {
        const saved = localStorage.getItem('invoice_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setData((prev) => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to load saved data");
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('invoice_data', JSON.stringify(data));
        }, 1000);
        return () => clearTimeout(timer);
    }, [data]);

    // --- CALCULATIONS ---
    const subtotal = data.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
    const taxAmount = data.isSellerGstRegistered ? (subtotal * data.taxRate) / 100 : 0;
    const total = subtotal + taxAmount;

    // -----------------------------------------------------------
    //  CENTRALIZED TAX CALCULATION (IGST vs CGST/SGST)
    // -----------------------------------------------------------
    const getCode = (str: string = '') => str ? str.split('-')[0].substring(0, 2) : '';
    const sellerCode = getCode(data.sellerGst);
    const buyerCode = getCode(data.placeOfSupply);
    // Strict Boolean Check
    const isIGST = (sellerCode !== '') && (buyerCode !== '') && (sellerCode !== buyerCode);
    // -----------------------------------------------------------

    const handleTemplateChange = (template: 'vintage' | 'ecommerce' | 'service' | 'evergreen') => {
        setActiveTemplate(template);
        if (!isEdited) {
            switch (template) {
                case 'vintage': setData(DEFAULTS_VINTAGE); break;
                case 'ecommerce': setData(DEFAULTS_ECOMMERCE); break;
                case 'service': setData(DEFAULTS_SERVICE); break;
                case 'evergreen': setData(DEFAULTS_EVERGREEN); break;
            }
        }
    };

    const handleInputChange = (field: keyof ExtendedInvoiceData, value: any) => {
        setData((prev) => {
            const newData = { ...prev, [field]: value };
            // AUTO-MAGIC: Toggle GST based on input
            if (field === 'sellerGst') {
                if (value === '') newData.isSellerGstRegistered = false;
                if (value.length > 2) newData.isSellerGstRegistered = true;
            }
            return newData;
        });
        setIsEdited(true);
    };

    const handleLogoStyleChange = (field: 'zoom' | 'fit', value: any) => {
        setData((prev) => ({
            ...prev,
            logoStyle: { ...prev.logoStyle!, [field]: value }
        }));
        setIsEdited(true);
    };

    const updateItem = (index: number, field: keyof LineItem, value: any) => {
        setData((prev) => {
            const newItems = [...prev.items];
            newItems[index] = { ...newItems[index], [field]: value };
            return { ...prev, items: newItems };
        });
        setIsEdited(true);
    };
    const addItem = () => { setData({ ...data, items: [...data.items, { id: Date.now().toString(), description: '', hsn: '', quantity: 1, rate: 0 }] }); setIsEdited(true); };
    const removeItem = (index: number) => { setData({ ...data, items: data.items.filter((_, i) => i !== index) }); setIsEdited(true); };

    const handlePrint = () => window.print();

    // --- DOWNLOAD PDF LOGIC ---
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        const element = document.getElementById('invoice-preview-container');
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 3,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                scrollY: 0,
                windowWidth: document.documentElement.offsetWidth,
            });

            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, (imgHeight * pdfWidth) / imgWidth);
            pdf.save(`Invoice-${data.invoiceNumber}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Could not generate PDF. Please try the "Print" button instead.');
        } finally {
            setIsDownloading(false);
        }
    };

    // --- CROPPER HANDLERS ---
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPendingImage(reader.result as string);
                setIsCropping(true);
                e.target.value = '';
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedImageUrl: string) => {
        setData((prev) => ({
            ...prev,
            logo: croppedImageUrl,
            logoStyle: { zoom: 1, fit: 'contain' }
        }));
        setIsEdited(true);
        setIsCropping(false);
        setPendingImage(null);
    };

    const handleCropCancel = () => {
        setIsCropping(false);
        setPendingImage(null);
    };

    const handleReset = () => {
        setIsEdited(false);
        localStorage.removeItem('invoice_data');
        switch (activeTemplate) {
            case 'vintage': setData(DEFAULTS_VINTAGE); break;
            case 'ecommerce': setData(DEFAULTS_ECOMMERCE); break;
            case 'service': setData(DEFAULTS_SERVICE); break;
            case 'evergreen': setData(DEFAULTS_EVERGREEN); break;
        }
    };

    return (
        <div className="bg-[#F8FAFC] font-sans text-slate-900 flex flex-col relative screen-layout-only print:h-auto print:overflow-visible">

            {/* --- CROP MODAL --- */}
            {isCropping && pendingImage && (
                <ImageCropper
                    imageSrc={pendingImage}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                />
            )}

            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0 no-print"></div>

            <style>{`
                @media screen {
                    .screen-layout-only { height: 100vh; width: 100vw; overflow: hidden; }
                    /* FIX: Removed display:flex here so Tailwind classes work */
                    .editor-sidebar { height: 100%; overflow-y: hidden; } 
                    .preview-wrapper { height: 100%; overflow-y: auto; }
                }
                @media print {
                    html, body, #root { width: 100% !important; height: auto !important; margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; }
                    nav, .editor-sidebar, .no-print, button { display: none !important; }
                    .screen-layout-only { height: auto !important; overflow: visible !important; display: block !important; }
                    .preview-wrapper { 
                        display: block !important; 
                        position: absolute !important; 
                        top: 0 !important; 
                        left: 0 !important; 
                        width: 100% !important; 
                        height: auto !important; 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        background: white !important; 
                        overflow: visible !important; 
                    }
                    #invoice-preview-container { 
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important; 
                        box-shadow: none !important;
                        transform: none !important;
                    }
                    @page { margin: 0; size: auto; }
                }
            `}</style>


            <div className="flex-1 flex overflow-hidden z-10 relative print:overflow-visible print:block">

                {/* ==================================================================================== */}
                {/* LEFT: EDITOR (Strictly hidden on mobile if view is 'preview')                        */}
                {/* ==================================================================================== */}
                <div className={`editor-sidebar w-full lg:w-5/12 xl:w-1/3 bg-white border-r border-slate-200 z-20 shadow-xl no-print flex-col h-full lg:flex ${mobileView === 'preview' ? 'hidden' : 'flex'}`}>

                    {/* --- STICKY SIDEBAR HEADER --- */}
                    <div className="p-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                                <Settings size={18} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">Editor</h2>
                        </div>
                        <div className="flex gap-2">
                            {isEdited && (
                                <button onClick={handleReset} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100" title="Reset Form"><RefreshCw size={18} /></button>
                            )}
                            <button onClick={handlePrint} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100" title="Print / Save as PDF"><Printer size={18} /></button>
                            <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95">
                                {isDownloading ? <RefreshCw size={14} className="animate-spin" /> : <Download size={14} />}
                                <span className="hidden sm:inline">{isDownloading ? 'Saving...' : 'Save PDF'}</span>
                            </button>
                        </div>
                    </div>

                    {/* --- SCROLLABLE CONTENT --- */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pb-32">
                        <div className="mb-6">
                            <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase tracking-wider">Choose Style</label>
                            <div className="grid grid-cols-2 gap-3">
                                <TemplateCard id="vintage" active={activeTemplate === 'vintage'} label="Vintage" icon={LayoutTemplate} onClick={handleTemplateChange} />
                                <TemplateCard id="ecommerce" active={activeTemplate === 'ecommerce'} label="Ecommerce" icon={ShoppingBagIcon} onClick={handleTemplateChange} />
                                <TemplateCard id="service" active={activeTemplate === 'service'} label="Service" icon={Zap} onClick={handleTemplateChange} />
                                <TemplateCard id="evergreen" active={activeTemplate === 'evergreen'} label="Evergreen" icon={Shield} onClick={handleTemplateChange} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <button onClick={() => setActiveSection(activeSection === 'details' ? '' : 'details')} className="w-full flex items-center justify-between p-3 px-4 bg-slate-50 hover:bg-slate-100 transition-colors"><span className="font-bold text-sm text-slate-700 flex items-center gap-2"><FileText size={16} className="text-slate-400" /> Invoice Meta</span>{activeSection === 'details' ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}</button>
                                {activeSection === 'details' && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                        <div className="flex items-center justify-between p-3 mb-3 bg-slate-50 rounded-lg border border-slate-200">
                                            <label className="text-xs font-bold text-slate-700">Enable GST/Tax?</label>
                                            <input type="checkbox" checked={data.isSellerGstRegistered} onChange={(e) => handleInputChange('isSellerGstRegistered', e.target.checked)} className="w-5 h-5 accent-blue-600 rounded cursor-pointer" />
                                        </div>
                                        {data.isSellerGstRegistered && (
                                            <div className="mb-3"><ModernInput label="Tax Rate (%)" type="number" value={data.taxRate} onChange={(e: any) => handleInputChange('taxRate', parseFloat(e.target.value))} icon={Percent} /></div>
                                        )}
                                        <div className="grid grid-cols-2 gap-4">
                                            <ModernInput label="Invoice No" value={data.invoiceNumber} onChange={(e: any) => handleInputChange('invoiceNumber', e.target.value)} />
                                            <div className="group relative">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Place of Supply</label>
                                                    <HelpCircle size={12} className="text-slate-400" />
                                                </div>
                                                <select value={data.placeOfSupply} onChange={(e) => handleInputChange('placeOfSupply', e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer">
                                                    <option value="" disabled>Select State</option>
                                                    {INDIAN_STATES.map((state) => (
                                                        <option key={state.code} value={`${state.code}-${state.name}`}>{state.name} ({state.code})</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <ModernInput label="Date" type="date" value={data.date} onChange={(e: any) => handleInputChange('date', e.target.value)} />
                                            <ModernInput label="Due Date" type="date" value={data.dueDate} onChange={(e: any) => handleInputChange('dueDate', e.target.value)} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <button onClick={() => setActiveSection(activeSection === 'seller' ? '' : 'seller')} className="w-full flex items-center justify-between p-3 px-4 bg-slate-50 hover:bg-slate-100 transition-colors"><span className="font-bold text-sm text-slate-700 flex items-center gap-2"><Box size={16} className="text-slate-400" /> Your Details</span>{activeSection === 'seller' ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}</button>
                                {activeSection === 'seller' && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                            <div className="relative group w-20 h-20 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                                                {data.logo ? (
                                                    <img src={data.logo} className="w-full h-full" style={{ objectFit: data.logoStyle?.fit || 'contain', transform: `scale(${data.logoStyle?.zoom || 1})` }} />
                                                ) : (<Upload size={20} className="text-slate-400" />)}
                                                <input type="file" accept="image/*" onChange={handleLogoUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div><p className="text-xs font-bold text-slate-700">Business Logo</p><p className="text-[10px] text-slate-400">Click image to upload. Use controls below to fit.</p></div>
                                                {data.logo && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md px-2 py-1">
                                                            <Maximize2 size={12} className="text-slate-400" />
                                                            <input type="range" min="0.5" max="2" step="0.1" value={data.logoStyle?.zoom || 1} onChange={(e) => handleLogoStyleChange('zoom', parseFloat(e.target.value))} className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                                                        </div>
                                                        <button onClick={() => handleLogoStyleChange('fit', data.logoStyle?.fit === 'contain' ? 'cover' : 'contain')} className="text-[10px] font-bold px-2 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 uppercase">{data.logoStyle?.fit || 'contain'}</button>
                                                        <button onClick={() => handleInputChange('logo', '')} className="text-[10px] text-red-500 hover:underline">Remove</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <ModernInput label="Business Name" value={data.sellerName} onChange={(e: any) => handleInputChange('sellerName', e.target.value)} />
                                        <ModernTextArea label="Address" value={data.sellerAddress} onChange={(e: any) => handleInputChange('sellerAddress', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-4"><ModernInput label="GSTIN" value={data.sellerGst} onChange={(e: any) => handleInputChange('sellerGst', e.target.value)} /><ModernInput label="Mobile" value={data.sellerMobile} onChange={(e: any) => handleInputChange('sellerMobile', e.target.value)} /></div>
                                        <ModernInput label="Email" value={data.sellerEmail} onChange={(e: any) => handleInputChange('sellerEmail', e.target.value)} />
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <button onClick={() => setActiveSection(activeSection === 'client' ? '' : 'client')} className="w-full flex items-center justify-between p-3 px-4 bg-slate-50 hover:bg-slate-100 transition-colors"><span className="font-bold text-sm text-slate-700 flex items-center gap-2"><User size={16} className="text-slate-400" /> Client Details</span>{activeSection === 'client' ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}</button>
                                {activeSection === 'client' && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                        <ModernInput label="Client Name" value={data.clientName} onChange={(e: any) => handleInputChange('clientName', e.target.value)} />
                                        <ModernTextArea label="Address" value={data.clientAddress} onChange={(e: any) => handleInputChange('clientAddress', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-4"><ModernInput label="GSTIN" value={data.clientGst} onChange={(e: any) => handleInputChange('clientGst', e.target.value)} /><ModernInput label="Mobile" value={data.clientMobile} onChange={(e: any) => handleInputChange('clientMobile', e.target.value)} /></div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <button onClick={() => setActiveSection(activeSection === 'items' ? '' : 'items')} className="w-full flex items-center justify-between p-3 px-4 bg-slate-50 hover:bg-slate-100 transition-colors"><span className="font-bold text-sm text-slate-700 flex items-center gap-2"><ShoppingCart size={16} className="text-slate-400" /> Line Items</span>{activeSection === 'items' ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}</button>
                                {activeSection === 'items' && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">

                                        {/* --- NEW: EMPTY STATE --- */}
                                        {data.items.length === 0 ? (
                                            <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-500">
                                                    <ShoppingCart size={20} />
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium mb-3">No items added yet</p>
                                                <button onClick={addItem} className="text-xs bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all">
                                                    Add First Item
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {data.items.map((item, idx) => (
                                                    <div key={item.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all">
                                                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-200/50">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Item #{idx + 1}</span>
                                                            <button onClick={() => removeItem(idx)} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50"><Trash2 size={14} /></button>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <ModernInput value={item.description} onChange={(e: any) => updateItem(idx, 'description', e.target.value)} placeholder="Item Description" />
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <ModernInput label="HSN" value={item.hsn} onChange={(e: any) => updateItem(idx, 'hsn', e.target.value)} />
                                                                <ModernInput label="Qty" type="number" value={item.quantity} onChange={(e: any) => updateItem(idx, 'quantity', Number(e.target.value))} />
                                                                <ModernInput label="Rate" type="number" value={item.rate} onChange={(e: any) => updateItem(idx, 'rate', Number(e.target.value))} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button onClick={addItem} className="w-full py-3 border border-dashed border-slate-300 text-slate-500 rounded-xl text-sm font-bold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2"><Plus size={16} /> Add New Item</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                <button onClick={() => setActiveSection(activeSection === 'bank' ? '' : 'bank')} className="w-full flex items-center justify-between p-3 px-4 bg-slate-50 hover:bg-slate-100 transition-colors"><span className="font-bold text-sm text-slate-700 flex items-center gap-2"><Landmark size={16} className="text-slate-400" /> Bank & Terms</span>{activeSection === 'bank' ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}</button>
                                {activeSection === 'bank' && (
                                    <div className="p-4 space-y-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                                        <ModernInput label="UPI ID (For QR Code)" value={data.upiId} onChange={(e: any) => handleInputChange('upiId', e.target.value)} placeholder="e.g. business@okaxis" icon={QrCode} />
                                        <div className="grid grid-cols-2 gap-4"><ModernInput label="Bank Name" value={data.bankName} onChange={(e: any) => handleInputChange('bankName', e.target.value)} /><ModernInput label="Account No" value={data.bankAccount} onChange={(e: any) => handleInputChange('bankAccount', e.target.value)} /><ModernInput label="IFSC" value={data.bankIfsc} onChange={(e: any) => handleInputChange('bankIfsc', e.target.value)} /><ModernInput label="Branch" value={data.bankBranch} onChange={(e: any) => handleInputChange('bankBranch', e.target.value)} /></div>
                                        <div className="h-px bg-slate-100 my-2"></div>
                                        <ModernTextArea label="Terms & Conditions" value={data.terms} onChange={(e: any) => handleInputChange('terms', e.target.value)} height="h-24" />
                                        <ModernTextArea label="Notes" value={data.notes} onChange={(e: any) => handleInputChange('notes', e.target.value)} height="h-16" />
                                        <ModernInput label="Signatory Label" value={data.signatory} onChange={(e: any) => handleInputChange('signatory', e.target.value)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* --- FEEDBACK BADGE --- */}
                        <div className="mt-8 flex items-center justify-between text-[10px] text-slate-400">
                            <div className="flex items-center gap-1"><Shield size={10} /> <span>100% Local & Private</span></div>
                            <a href="mailto:support@karapi.io" className="hover:text-blue-500 flex items-center gap-1 transition-colors"><MessageSquare size={10} /> Feedback</a>
                        </div>
                    </div>
                </div>

                {/* ==================================================================================== */}
                {/* RIGHT: PREVIEW WRAPPER (Strictly hidden on mobile if view is 'editor')               */}
                {/* ==================================================================================== */}
                <div className={`preview-wrapper w-full lg:w-7/12 xl:w-2/3 bg-[#F8FAFC] relative flex-col items-center lg:flex ${mobileView === 'editor' ? 'hidden' : 'flex'}`}>
                    <div className="w-full flex justify-center p-8 pb-32 lg:pb-8">
                        <div id="invoice-preview-container" className="bg-white shadow-xl shadow-slate-200/60 w-full max-w-[794px] h-auto relative flex flex-col transition-all duration-300">
                            {/* TEMPLATES */}
                            {activeTemplate === 'vintage' ? <TemplateVintage data={data} subtotal={subtotal} taxAmount={taxAmount} total={total} isIGST={isIGST} /> :
                                activeTemplate === 'ecommerce' ? <TemplateEcommerce data={data} subtotal={subtotal} taxAmount={taxAmount} total={total} isIGST={isIGST} /> :
                                    activeTemplate === 'service' ? <TemplateService data={data} subtotal={subtotal} taxAmount={taxAmount} total={total} isIGST={isIGST} /> :
                                        <TemplateEvergreen data={data} subtotal={subtotal} taxAmount={taxAmount} total={total} isIGST={isIGST} />
                            }
                        </div>
                    </div>
                </div>

            </div>

            {/* --- NEW: MOBILE TOGGLE BAR --- */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white p-1.5 rounded-full shadow-2xl flex gap-1 items-center border border-slate-700/50">
                <button
                    onClick={() => setMobileView('editor')}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mobileView === 'editor' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                    <Settings size={14} /> Editor
                </button>
                <button
                    onClick={() => setMobileView('preview')}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mobileView === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                    <FileText size={14} /> Preview
                </button>
            </div>

            <SupportWidget />
        </div>
    );
}

const ShoppingBagIcon = ({ size, className }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);