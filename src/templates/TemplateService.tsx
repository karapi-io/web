// src/templates/TemplateService.tsx
import React from 'react';
import type { TemplateProps } from '../types/invoice';
import { formatCurrency, numberToWords } from '../utils/format';
import { InvoiceQRCode } from '../components/InvoiceQRCode'; // <--- IMPORT

export const TemplateService: React.FC<TemplateProps> = ({ data, subtotal, taxAmount, total }) => {
    return (
        <div className="font-sans text-slate-800 p-8 h-auto flex flex-col bg-white text-[11px] leading-snug relative">

            {/* 1. HEADER */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    {data.logo ? (
                        <img src={data.logo} alt="Logo" className="h-8 object-contain mb-2" />
                    ) : (
                        <div className="text-xl font-bold text-blue-900 mb-2">{data.sellerName}</div>
                    )}
                    <div className="font-bold">{data.sellerName}</div>
                    <div>GSTIN: {data.sellerGst}</div>
                    <div className="text-slate-600 whitespace-pre-line max-w-xs">{data.sellerAddress}</div>
                    <div className="text-slate-600 mt-1">
                        Mobile: {data.sellerMobile} &bull; Email: {data.sellerEmail}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-blue-900 font-bold uppercase text-lg mb-1">TAX INVOICE</div>
                    <div className="font-bold text-slate-900 text-sm">#{data.invoiceNumber}</div>
                </div>
            </div>

            {/* 2. INFO GRID */}
            <div className="flex justify-between items-start mb-6 border-t border-b border-slate-200 py-4">
                <div className="w-[45%]">
                    <div className="font-bold text-slate-500 text-[10px] uppercase mb-1">Bill To</div>
                    <div className="font-bold text-sm">{data.clientName}</div>
                    <div>GSTIN: {data.clientGst}</div>
                    <div className="text-slate-600 whitespace-pre-line">{data.clientAddress}</div>
                    <div className="text-slate-600">Ph: {data.clientMobile}</div>
                </div>
                <div className="w-[45%] text-right">
                    <div className="grid grid-cols-[1fr_120px] gap-y-1">
                        <div className="text-slate-500">Invoice Date:</div><div className="font-bold">{data.date}</div>
                        <div className="text-slate-500">Due Date:</div><div className="font-bold">{data.dueDate}</div>
                        <div className="text-slate-500">Place of Supply:</div><div className="font-bold">{data.placeOfSupply}</div>
                    </div>
                </div>
            </div>

            {/* 3. ITEMS TABLE */}
            <div className="mb-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-800 text-[10px] uppercase tracking-wide">
                            <th className="py-2 text-left w-[5%]">#</th>
                            <th className="py-2 text-left w-[45%]">Item Description</th>
                            <th className="py-2 text-right w-[15%]">Rate</th>
                            <th className="py-2 text-right w-[10%]">Qty</th>
                            <th className="py-2 text-right w-[25%]">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, idx) => (
                            <tr key={item.id} className="border-b border-slate-100 last:border-0">
                                <td className="py-2 align-top font-bold text-slate-500">{idx + 1}</td>
                                <td className="py-2 align-top">
                                    <div className="font-bold text-slate-900">{item.description}</div>
                                    <div className="text-[9px] text-slate-500">HSN: {item.hsn}</div>
                                </td>
                                <td className="py-2 align-top text-right">{formatCurrency(item.rate).replace('₹', '')}</td>
                                <td className="py-2 align-top text-right">{item.quantity}</td>
                                <td className="py-2 align-top text-right font-bold">{formatCurrency(item.rate * item.quantity).replace('₹', '')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. TOTALS & BANK */}
            <div className="flex justify-between items-start mb-6 break-inside-avoid">
                {/* Left: Bank & QR */}
                <div className="w-[50%] pr-8">
                    <div className="font-bold border-b border-slate-300 pb-1 mb-2 text-slate-900">Bank Details</div>
                    <div className="grid grid-cols-[70px_1fr] gap-y-0.5 text-slate-700">
                        <span className="font-bold text-slate-500">Bank:</span> <span className="font-semibold">{data.bankName}</span>
                        <span className="font-bold text-slate-500">Account:</span> <span className="font-semibold">{data.bankAccount}</span>
                        <span className="font-bold text-slate-500">IFSC:</span> <span className="font-semibold">{data.bankIfsc}</span>
                        <span className="font-bold text-slate-500">Branch:</span> <span className="font-semibold">{data.bankBranch}</span>
                    </div>

                    {/* QR Code Section */}
                    <div className="mt-2">
                        <InvoiceQRCode
                            upiId={data.upiId}
                            name={data.sellerName}
                            amount={total}
                        />
                    </div>
                </div>

                {/* Right: Totals */}
                <div className="w-[45%]">
                    <div className="flex justify-between mb-1"><span className="text-slate-600">Taxable Amount</span><span className="font-bold">{formatCurrency(subtotal)}</span></div>
                    {data.isSellerGstRegistered && (
                        <>
                            <div className="flex justify-between mb-1 text-slate-600"><span>CGST 9.0%</span><span>{formatCurrency(taxAmount / 2)}</span></div>
                            <div className="flex justify-between mb-2 text-slate-600"><span>SGST 9.0%</span><span>{formatCurrency(taxAmount / 2)}</span></div>
                        </>
                    )}
                    <div className="flex justify-between bg-blue-50 border-t-2 border-blue-800 py-2 px-2 text-base font-bold text-blue-900 mt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 italic text-right border-t border-slate-100 pt-1">
                        Amount in words: {numberToWords(total)}
                    </div>
                </div>
            </div>

            {/* 5. FOOTER */}
            <div className="break-inside-avoid">
                <div className="flex justify-between items-end">
                    <div className="w-[60%] text-[10px] text-slate-500">
                        <div className="font-bold text-slate-900 mb-1">Terms & Conditions:</div>
                        <div className="whitespace-pre-line leading-tight">{data.terms}</div>
                    </div>
                    <div className="w-[30%] text-right">
                        <div className="font-bold text-slate-900 mb-6">For {data.sellerName}</div>
                        <div className="border-t border-slate-400 pt-1 text-[10px] text-slate-500">{data.signatory}</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 text-[9px] text-slate-400 text-center border-t border-slate-100 pt-2">
                This is a computer generated invoice.
            </div>
        </div>
    );
};