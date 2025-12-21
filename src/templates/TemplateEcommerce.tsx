// src/templates/TemplateEcommerce.tsx
import React from 'react';
import type { TemplateProps } from '../types/invoice';
import { formatCurrency, numberToWords } from '../utils/format';
import { InvoiceQRCode } from '../components/InvoiceQRCode';

export const TemplateEcommerce: React.FC<TemplateProps> = ({ data, subtotal, taxAmount, total }) => {
    return (
        <div className="font-sans text-slate-900 p-8 h-auto bg-white text-[11px] leading-snug">

            {/* HEADER */}
            <div className="flex justify-between items-start mb-6">
                <div className="w-1/2">
                    <div className="text-blue-700 font-bold uppercase text-sm mb-2">TAX INVOICE</div>
                    <div className="font-bold text-lg mb-1">{data.sellerName}</div>
                    <div className="font-bold mb-1">GSTIN {data.sellerGst}</div>
                    <div className="text-slate-600 whitespace-pre-line mb-1 max-w-xs">{data.sellerAddress}</div>
                    <div className="text-slate-600">Mobile {data.sellerMobile} &bull; {data.sellerEmail}</div>
                </div>
                <div className="w-1/2 text-right">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-4">ORIGINAL FOR RECIPIENT</div>
                    {data.logo ? (
                        <img
                            src={data.logo}
                            alt="Logo"
                            className="h-10 object-contain ml-auto mb-4"
                            style={{
                                objectFit: data.logoStyle?.fit || 'contain',
                                transform: `scale(${data.logoStyle?.zoom || 1})`
                            }}
                        />
                    ) : (
                        <div className="text-3xl font-extrabold text-slate-800 italic mb-4 ml-auto">amazon</div>
                    )}
                </div>
            </div>

            {/* INVOICE META */}
            <div className="flex justify-between items-start mb-6 border-t border-b border-slate-200 py-2">
                <div><div className="font-bold">Invoice #: <span className="text-slate-700">{data.invoiceNumber}</span></div><div className="font-bold mt-1">Place: <span className="text-slate-700">{data.placeOfSupply}</span></div></div>
                <div className="text-center"><div className="font-bold">Date: <span className="text-slate-700">{data.date}</span></div></div>
                <div className="text-right"><div className="font-bold">Due: <span className="text-slate-700">{data.dueDate}</span></div></div>
            </div>

            {/* ADDRESS */}
            <div className="flex gap-8 mb-6">
                <div className="w-1/3"><div className="font-bold mb-1">Customer:</div><div className="font-bold text-sm">{data.clientName}</div><div className="text-slate-600">Ph: {data.clientMobile}</div></div>
                <div className="w-1/3"><div className="font-bold mb-1">Billing:</div><div className="text-slate-600 whitespace-pre-line">{data.clientAddress}</div></div>
                <div className="w-1/3"><div className="font-bold mb-1">Shipping:</div><div className="text-slate-600 whitespace-pre-line">{data.clientAddress}</div></div>
            </div>

            {/* ITEMS */}
            <div className="mb-4">
                <table className="w-full">
                    <thead>
                        <tr className="border-t border-b border-slate-300 bg-slate-50">
                            <th className="py-2 text-left w-[5%] text-slate-600 pl-2">#</th>
                            <th className="py-2 text-left w-[35%] text-slate-600">Item</th>
                            <th className="py-2 text-right w-[15%] text-slate-600">Rate</th>
                            <th className="py-2 text-right w-[10%] text-slate-600">Qty</th>
                            <th className="py-2 text-right w-[15%] text-slate-600">Taxable</th>
                            <th className="py-2 text-right w-[10%] text-slate-600">Tax</th>
                            <th className="py-2 text-right w-[10%] text-slate-600 pr-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, idx) => (
                            <tr key={item.id} className="border-b border-slate-100">
                                <td className="py-2 align-top text-slate-600 pl-2">{idx + 1}</td>
                                <td className="py-2 align-top"><div className="font-bold text-slate-900">{item.description}</div><div className="text-[9px] text-slate-400">HSN: {item.hsn}</div></td>
                                <td className="py-2 align-top text-right font-bold">{formatCurrency(item.rate).replace('₹', '')}</td>
                                <td className="py-2 align-top text-right text-slate-600">{item.quantity}</td>
                                <td className="py-2 align-top text-right text-slate-600">{formatCurrency(item.rate * item.quantity).replace('₹', '')}</td>
                                <td className="py-2 align-top text-right text-slate-500">{data.isSellerGstRegistered ? formatCurrency((item.rate * item.quantity) * 0.18).replace('₹', '') : '-'}</td>
                                <td className="py-2 align-top text-right font-bold text-slate-900 pr-2">{formatCurrency((item.rate * item.quantity) * 1.18).replace('₹', '')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TOTALS */}
            <div className="flex justify-end mb-4 break-inside-avoid">
                <div className="w-1/3">
                    <div className="flex justify-between mb-1 text-slate-600 font-bold"><span>Taxable</span><span>{formatCurrency(subtotal)}</span></div>
                    {data.isSellerGstRegistered && (<div className="flex justify-between mb-2 text-slate-600 font-bold"><span>IGST 18%</span><span>{formatCurrency(taxAmount)}</span></div>)}
                    <div className="flex justify-between border-t border-b border-slate-900 py-2 text-lg font-bold text-slate-900"><span>Total</span><span>{formatCurrency(total)}</span></div>
                </div>
            </div>

            <div className="border-b border-slate-300  text-right break-inside-avoid pb-2"><span className="text-slate-500">Total (Words): </span><span className="font-bold text-slate-800">{numberToWords(total)}</span></div>

            {/* FOOTER */}
            <div className="flex justify-between items-start pt-2 break-inside-avoid">
                <div className="flex gap-8 items-start">
                    {/* QR CODE - Shows only if UPI ID is present */}
                    <InvoiceQRCode
                        upiId={data.upiId}
                        name={data.sellerName}
                        amount={total}
                    />

                    {/* Bank Details - Aligned with QR text using mt-4 pt-3 */}
                    <div className="text-slate-800 mt-4 pt-3">
                        <div className="font-bold mb-2">Bank Details:</div>
                        <div className="grid grid-cols-[50px_1fr] gap-y-1 text-[10px]">
                            <span className="text-slate-500">Bank:</span> <span className="font-bold">{data.bankName}</span>
                            <span className="text-slate-500">Acc:</span> <span className="font-bold">{data.bankAccount}</span>
                            <span className="text-slate-500">IFSC:</span> <span className="font-bold">{data.bankIfsc}</span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-slate-500 mb-6">For {data.sellerName}</div>
                    <div className="flex flex-col items-end"><div className="text-xs font-bold">{data.signatory}</div></div>
                </div>
            </div>

            <div className="mt-4 text-[10px] text-slate-500">
                <div className="font-bold text-slate-700 mb-1">Terms:</div>
                <div className="whitespace-pre-line leading-relaxed">{data.terms}</div>
            </div>
        </div>
    );
};