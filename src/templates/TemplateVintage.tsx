import React from 'react';
import type { TemplateProps } from '../types/invoice';
import { formatCurrency, numberToWords } from '../utils/format';
import { InvoiceQRCode } from '../components/InvoiceQRCode';

export const TemplateVintage: React.FC<TemplateProps> = ({ data, subtotal, taxAmount, total }) => {
    return (
        // FIX 1: Changed leading-tight to leading-normal for better text vertical spacing
        <div className="font-sans text-black p-8 h-full flex flex-col bg-white text-[11px] leading-normal">

            {/* Main Border Container */}
            <div className="border border-slate-400 h-full flex flex-col">
                {/* TOP HEADER */}
                <div className="flex justify-between items-center border-b border-slate-400 py-2 px-3">
                    <div className="w-1/3"></div>
                    <div className="text-blue-600 font-bold uppercase tracking-wide text-sm w-1/3 text-center">TAX INVOICE</div>
                    <div className="w-1/3 text-right text-[9px] text-slate-500 uppercase">ORIGINAL FOR RECIPIENT</div>
                </div>

                {/* SELLER & INVOICE DETAILS */}
                <div className="flex border-b border-slate-400">
                    <div className="w-1/2 p-3 border-r border-slate-400">
                        <div className="flex gap-4">
                            {data.logo ? (
                                <div className="w-12 h-12 flex items-center justify-center shrink-0">
                                    <img
                                        src={data.logo}
                                        alt="Logo"
                                        className="max-w-full max-h-full object-contain"
                                        style={{
                                            objectFit: data.logoStyle?.fit || 'contain',
                                            transform: `scale(${data.logoStyle?.zoom || 1})`
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="w-12 h-12 bg-blue-700 flex items-center justify-center text-white font-bold text-xs rounded-sm shrink-0">
                                    {data.sellerName.substring(0, 1)}
                                </div>
                            )}
                            <div>
                                <div className="font-bold text-sm uppercase mb-1">{data.sellerName}</div>
                                <div className="font-bold mb-1">GSTIN: {data.sellerGst}</div>
                                <div className="whitespace-pre-line text-slate-600 mb-1">{data.sellerAddress}</div>
                                <div className="font-bold">Mobile: <span className="font-normal text-slate-600">{data.sellerMobile}</span></div>
                                <div className="font-bold">Email: <span className="font-normal text-slate-600">{data.sellerEmail}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col">
                        <div className="flex border-b border-slate-400">
                            <div className="w-1/2 p-2 border-r border-slate-400"><div className="font-bold">Invoice #:</div><div>{data.invoiceNumber}</div></div>
                            <div className="w-1/2 p-2"><div className="font-bold">Invoice Date:</div><div>{data.date}</div></div>
                        </div>
                        <div className="flex flex-grow">
                            <div className="w-1/2 p-2 border-r border-slate-400 border-b border-slate-400 flex flex-col justify-center"><div className="font-bold">Place of Supply:</div><div>{data.placeOfSupply}</div></div>
                            <div className="w-1/2 p-2 border-b border-slate-400 flex flex-col justify-center"><div className="font-bold">Due Date:</div><div>{data.dueDate}</div></div>
                        </div>
                    </div>
                </div>

                {/* ADDRESS SECTION */}
                <div className="flex border-b border-slate-400">
                    <div className="w-1/2 p-3 border-r border-slate-400">
                        <div className="font-bold mb-1 text-slate-500 uppercase text-[9px]">Bill To:</div>
                        <div className="font-bold mb-1">{data.clientName}</div>
                        <div className="whitespace-pre-line text-slate-600 mb-2">{data.clientAddress}</div>
                        {data.clientGst && <div className="font-bold">GSTIN: <span className="font-normal">{data.clientGst}</span></div>}
                    </div>
                    <div className="w-1/2 p-3">
                        <div className="font-bold mb-1 text-slate-500 uppercase text-[9px]">Ship To:</div>
                        <div className="whitespace-pre-line text-slate-600">{data.clientAddress}</div>
                    </div>
                </div>

                {/* ITEMS TABLE */}
                <div className="flex-grow flex flex-col">
                    <div className="flex border-b border-slate-400 bg-slate-50 font-bold text-center items-center">
                        <div className="w-[5%] py-2 border-r border-slate-400">#</div>
                        <div className="w-[35%] py-2 text-left px-3 border-r border-slate-400">Item</div>
                        <div className="w-[10%] py-2 border-r border-slate-400">HSN/SAC</div>
                        <div className="w-[12%] py-2 text-right px-3 border-r border-slate-400">Rate</div>
                        <div className="w-[8%] py-2 text-right px-3 border-r border-slate-400">Qty</div>
                        <div className="w-[15%] py-2 text-right px-3 border-r border-slate-400">Taxable</div>
                        <div className="w-[15%] py-2 text-right px-3">Amount</div>
                    </div>

                    {data.items.map((item, idx) => (
                        // FIX 2: Increased min-height and vertical padding to prevent text touching lines
                        <div key={item.id} className="flex border-b border-slate-200 text-[10px] min-h-[45px]">
                            <div className="w-[5%] py-2 border-r border-slate-400 text-center flex items-center justify-center">{idx + 1}</div>
                            <div className="w-[35%] py-2 px-3 border-r border-slate-400 whitespace-pre-wrap font-bold flex items-center">{item.description}</div>
                            <div className="w-[10%] py-2 text-center border-r border-slate-400 flex items-center justify-center">{item.hsn}</div>
                            <div className="w-[12%] py-2 text-right px-3 border-r border-slate-400 font-bold flex items-center justify-end">{formatCurrency(item.rate).replace('₹', '')}</div>
                            <div className="w-[8%] py-2 text-right px-3 border-r border-slate-400 flex items-center justify-end">{item.quantity}</div>
                            <div className="w-[15%] py-2 text-right px-3 border-r border-slate-400 flex items-center justify-end">{formatCurrency(item.rate * item.quantity).replace('₹', '')}</div>
                            <div className="w-[15%] py-2 text-right px-3 font-bold flex items-center justify-end">{formatCurrency(item.rate * item.quantity).replace('₹', '')}</div>
                        </div>
                    ))}
                    {/* Fill empty space */}
                    <div className="flex-grow flex border-b border-slate-400 min-h-[50px]">
                        <div className="w-[5%] border-r border-slate-400"></div><div className="w-[35%] border-r border-slate-400"></div><div className="w-[10%] border-r border-slate-400"></div><div className="w-[12%] border-r border-slate-400"></div><div className="w-[8%] border-r border-slate-400"></div><div className="w-[15%] border-r border-slate-400"></div><div className="w-[15%]"></div>
                    </div>
                </div>

                {/* TOTALS */}
                <div className="flex border-b border-slate-400">
                    <div className="w-[70%] border-r border-slate-400 p-2 flex items-center"><span className="text-[10px] font-bold">Total Items: {data.items.length}</span></div>
                    <div className="w-[30%]">
                        <div className="flex justify-between px-3 py-1 border-b border-slate-400"><span className="font-bold">Taxable Amount</span><span className="font-bold">{formatCurrency(subtotal)}</span></div>
                        {data.isSellerGstRegistered && (<div className="flex justify-between px-3 py-1 border-b border-slate-400 text-slate-600"><span>Total Tax (18%)</span><span>{formatCurrency(taxAmount)}</span></div>)}
                        <div className="flex justify-between px-3 py-2 bg-slate-100 font-bold text-sm"><span>Total</span><span>{formatCurrency(total)}</span></div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="border-b border-slate-400 p-2 bg-slate-50"><span className="font-bold text-slate-600">Total amount (in words): </span><span className="font-bold uppercase text-[9px]">INR {numberToWords(total)}</span></div>

                {/* FIX 3: Increased padding in the footer columns to p-3 (was p-2) to push text away from vertical borders */}
                <div className="flex flex-grow min-h-[160px]">
                    <div className="w-[40%] border-r border-slate-400 p-3 flex flex-col justify-between">
                        <div><div className="font-bold border-b border-slate-400 mb-2 pb-1">Bank Details:</div><div className="grid grid-cols-[60px_1fr] gap-y-1 text-[10px]"><div className="font-bold text-slate-600">Bank:</div><div className="font-bold uppercase">{data.bankName}</div><div className="font-bold text-slate-600">Account #:</div><div className="font-bold">{data.bankAccount}</div><div className="font-bold text-slate-600">IFSC:</div><div className="font-bold uppercase">{data.bankIfsc}</div><div className="font-bold text-slate-600">Branch:</div><div className="font-bold">{data.bankBranch}</div></div></div>
                        <div className="mt-4"><div className="font-bold border-b border-slate-400 mb-1">Notes:</div><div>{data.notes}</div></div>
                    </div>

                    <div className="w-[20%] border-r border-slate-400 p-3 text-center flex flex-col items-center justify-center">
                        <InvoiceQRCode upiId={data.upiId} name={data.sellerName} amount={total} />
                    </div>

                    <div className="w-[40%] p-3 flex flex-col justify-between">
                        <div><div className="font-bold border-b border-slate-400 mb-2">Terms and Conditions:</div><div className="whitespace-pre-line text-[9px] leading-relaxed pr-2">{data.terms}</div></div>
                        <div className="text-right mt-4"><div className="font-bold text-[10px] mb-8">For {data.sellerName}</div><div className="border-t border-slate-400 inline-block pt-1 text-[9px]">{data.signatory}</div></div>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-[9px] text-slate-500">Page 1 / 1</div>
        </div>
    );
};