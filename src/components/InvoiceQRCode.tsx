import { QRCodeSVG } from 'qrcode.react';

interface Props {
    upiId?: string;
    name: string;
    amount: number;
}

export const InvoiceQRCode = ({ upiId, name, amount }: Props) => {
    // If user didn't type a UPI ID, render nothing
    if (!upiId) return null;

    // UPI Link Format: upi://pay?pa=ADDRESS&pn=NAME&am=AMOUNT&cu=INR
    const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;

    return (
        <div className="mt-4 flex flex-col items-start border-t border-dashed border-slate-300 pt-3">
            <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Scan to Pay</p>
            <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
                <QRCodeSVG value={qrValue} size={80} level="M" />
            </div>
            <p className="text-[9px] text-slate-400 mt-1 font-mono">{upiId}</p>
        </div>
    );
};