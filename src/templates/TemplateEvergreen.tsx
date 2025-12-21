import React from 'react';
import type { TemplateProps } from '../types/invoice';
import { formatCurrency, numberToWords } from '../utils/format';
import { InvoiceQRCode } from '../components/InvoiceQRCode';

export const TemplateEvergreen: React.FC<TemplateProps> = ({ data, subtotal, taxAmount, total }) => {

    // --- NEW: LOGIC TO GROUP TOTALS BY HSN ---
    // This creates a map like: { "8517": { taxable: 1000, tax: 180 }, "9983": { ... } }
    const hsnSummary = data.items.reduce((acc, item) => {
        const hsn = item.hsn || 'General';
        if (!acc[hsn]) {
            acc[hsn] = { taxable: 0, tax: 0 };
        }
        const itemTotal = item.rate * item.quantity;
        acc[hsn].taxable += itemTotal;
        // Calculate tax portion for this item
        if (data.isSellerGstRegistered) {
            acc[hsn].tax += (itemTotal * (data.taxRate / 100));
        }
        return acc;
    }, {} as Record<string, { taxable: number; tax: number }>);
    // -----------------------------------------

    return (
        <div className="font-sans text-slate-900 p-8 min-h-full flex flex-col bg-white text-[10px] leading-tight">

            {/* --- HEADER --- */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    {/* Logo */}
                    <div className="w-16 h-16 flex items-center justify-center">
                        {data.logo ? (
                            <img src={data.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <div className="text-3xl font-bold text-blue-900 border-2 border-blue-900 p-2 rounded">ITC</div>
                        )}
                    </div>
                    {/* Company Details */}
                    <div>
                        <div className="font-bold text-base uppercase text-slate-800 mb-1">{data.sellerName}</div>
                        <div className="whitespace-pre-line max-w-sm text-slate-600 mb-1">{data.sellerAddress}</div>
                        <div className="font-bold">GSTIN: {data.sellerGst}</div>
                        <div>Mobile: {data.sellerMobile} &bull; Email: {data.sellerEmail}</div>
                    </div>
                </div>

                {/* Right Header */}
                <div className="text-right">
                    <div className="text-blue-700 font-bold text-sm uppercase mb-1">TAX INVOICE</div>
                    <div className="text-[9px] text-slate-500 uppercase mb-2">ORIGINAL FOR RECIPIENT</div>
                </div>
            </div>

            {/* --- INFO GRID (BORDERS) --- */}
            <div className="border border-slate-400 mb-4">
                <div className="flex">
                    {/* LEFT: Customer */}
                    <div className="w-1/2 border-r border-slate-400 p-2">
                        <div className="font-bold mb-1">Customer Details:</div>
                        <div className="font-bold text-sm mb-1">{data.clientName}</div>
                        <div className="mb-2">GSTIN: {data.clientGst}</div>

                        <div className="font-bold mb-1">Billing Address:</div>
                        <div className="whitespace-pre-line text-slate-600 mb-2">{data.clientAddress}</div>

                        <div className="font-bold mb-1">Shipping Address:</div>
                        <div className="whitespace-pre-line text-slate-600">{data.clientAddress}</div>
                    </div>

                    {/* RIGHT: Invoice Meta */}
                    <div className="w-1/2">
                        <div className="flex border-b border-slate-400">
                            <div className="w-1/2 p-2 border-r border-slate-400">
                                <div className="font-bold">Invoice #:</div>
                                <div>{data.invoiceNumber}</div>
                            </div>
                            <div className="w-1/2 p-2">
                                <div className="font-bold">Date:</div>
                                <div>{data.date}</div>
                            </div>
                        </div>
                        <div className="flex border-b border-slate-400">
                            <div className="w-1/2 p-2 border-r border-slate-400">
                                <div className="font-bold">Place of Supply:</div>
                                <div>{data.placeOfSupply}</div>
                            </div>
                            <div className="w-1/2 p-2">
                                <div className="font-bold">Due Date:</div>
                                <div>{data.dueDate}</div>
                            </div>
                        </div>
                        <div className="p-2">
                            <div className="font-bold">Vehicle Number:</div>
                            <div>-</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- ITEMS TABLE --- */}
            <div className="border border-slate-400 border-b-0 mb-0 flex-grow">
                {/* Header */}
                <div className="flex bg-slate-100 font-bold border-b border-slate-400 text-center items-center">
                    <div className="w-[5%] py-2 border-r border-slate-400">#</div>
                    <div className="w-[40%] py-2 border-r border-slate-400 text-left px-2">Item Description</div>
                    <div className="w-[10%] py-2 border-r border-slate-400">HSN/SAC</div>
                    <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2">Rate</div>
                    <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2">Qty</div>
                    <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2">IGST</div>
                    <div className="w-[15%] py-2 text-right px-2">Amount</div>
                </div>

                {/* Rows */}
                {data.items.map((item, idx) => (
                    <div key={item.id} className="flex border-b border-slate-400 text-slate-800">
                        <div className="w-[5%] py-2 border-r border-slate-400 text-center">{idx + 1}</div>
                        <div className="w-[40%] py-2 border-r border-slate-400 px-2 font-semibold">{item.description}</div>
                        <div className="w-[10%] py-2 border-r border-slate-400 text-center">{item.hsn}</div>
                        <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2">{formatCurrency(item.rate).replace('₹', '')}</div>
                        <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2">{item.quantity}</div>
                        <div className="w-[10%] py-2 border-r border-slate-400 text-right px-2 text-[9px] text-slate-500">
                            {data.isSellerGstRegistered ? formatCurrency((item.rate * item.quantity) * 0.18).replace('₹', '') : '-'}
                        </div>
                        <div className="w-[15%] py-2 text-right px-2 font-bold">{formatCurrency(item.rate * item.quantity).replace('₹', '')}</div>
                    </div>
                ))}
            </div>

            {/* --- TOTALS SECTION (Boxed) --- */}
            <div className="border border-slate-400 border-t-0 mb-4 flex break-inside-avoid">
                {/* Left: Words */}
                <div className="w-[60%] border-r border-slate-400 p-2 flex flex-col justify-end">
                    <div className="text-slate-500 mb-1">Total Items / Qty: {data.items.length}</div>
                    <div className="font-bold">Amount in Words:</div>
                    <div className="italic">{numberToWords(total)}</div>
                </div>

                {/* Right: Numbers */}
                <div className="w-[40%]">
                    <div className="flex justify-between p-1 px-2 border-b border-slate-400">
                        <span>Taxable Amount</span>
                        <span className="font-bold">{formatCurrency(subtotal)}</span>
                    </div>
                    {data.isSellerGstRegistered && (
                        <div className="flex justify-between p-1 px-2 border-b border-slate-400 text-slate-600">
                            <span>Total Tax (18%)</span>
                            <span>{formatCurrency(taxAmount)}</span>
                        </div>
                    )}
                    <div className="flex justify-between p-2 px-2 font-bold text-sm bg-slate-50">
                        <span>Grand Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            {/* --- BANK & QR SUMMARY --- */}
            <div className="flex border border-slate-400 mb-4 break-inside-avoid">
                {/* Bank & QR Container */}
                <div className="w-1/2 p-2 border-r border-slate-400 flex justify-between">
                    <div className="flex-1">
                        <div className="font-bold border-b border-slate-400 mb-2 pb-1">Bank Details</div>
                        <div className="grid grid-cols-[60px_1fr] gap-y-1">
                            <span className="text-slate-600">Bank:</span> <span className="font-bold">{data.bankName}</span>
                            <span className="text-slate-600">A/c No:</span> <span className="font-bold">{data.bankAccount}</span>
                            <span className="text-slate-600">IFSC:</span> <span className="font-bold">{data.bankIfsc}</span>
                            <span className="text-slate-600">Branch:</span> <span className="font-bold">{data.bankBranch}</span>
                        </div>
                    </div>

                    {/* Added QR Code here */}
                    <div className="ml-2">
                        <InvoiceQRCode upiId={data.upiId} name={data.sellerName} amount={total} />
                    </div>
                </div>

                {/* HSN Summary (NOW DYNAMIC) */}
                <div className="w-1/2">
                    <div className="bg-slate-100 font-bold border-b border-slate-400 p-1 text-center text-[9px]">HSN/SAC Summary</div>
                    <div className="flex text-[9px] text-center font-bold border-b border-slate-400">
                        <div className="w-1/3 py-1 border-r border-slate-400">HSN</div>
                        <div className="w-1/3 py-1 border-r border-slate-400">Taxable</div>
                        <div className="w-1/3 py-1">Tax Amount</div>
                    </div>

                    {/* Dynamic HSN Rows */}
                    {Object.entries(hsnSummary).map(([hsn, amounts]) => (
                        <div key={hsn} className="flex text-[9px] text-center border-b border-slate-400">
                            <div className="w-1/3 py-1 border-r border-slate-400">{hsn}</div>
                            <div className="w-1/3 py-1 border-r border-slate-400">{formatCurrency(amounts.taxable)}</div>
                            <div className="w-1/3 py-1">{formatCurrency(amounts.tax)}</div>
                        </div>
                    ))}

                    <div className="flex text-[9px] text-center font-bold bg-slate-50">
                        <div className="w-1/3 py-1 border-r border-slate-400">Total</div>
                        <div className="w-1/3 py-1 border-r border-slate-400">{formatCurrency(subtotal)}</div>
                        <div className="w-1/3 py-1">{formatCurrency(taxAmount)}</div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="mt-auto flex justify-between items-end break-inside-avoid">
                <div className="w-[60%]">
                    <div className="font-bold mb-1">Terms and Conditions:</div>
                    <ul className="list-decimal pl-3 space-y-0.5 text-slate-600">
                        <li>Goods once sold cannot be taken back or exchanged.</li>
                        <li>Interest @24% p.a. will be charged for delayed payments.</li>
                        <li>Subject to local Jurisdiction.</li>
                    </ul>
                </div>
                <div className="w-[30%] text-right">
                    <div className="font-bold text-slate-800 mb-8">For {data.sellerName}</div>
                    <div className="font-brush text-xl text-blue-900 mb-1 transform -rotate-2">
                        {/* Signature Placeholder */}
                        <br />
                    </div>
                    <div className="border-t border-slate-400 pt-1 text-slate-500">Authorized Signatory</div>
                </div>
            </div>

            <div className="mt-2 text-[9px] text-slate-400 text-center">Page 1 / 1 &nbsp;&nbsp; This is a computer generated invoice.</div>
        </div>
    );
};