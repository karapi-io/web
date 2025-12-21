
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
    }).format(amount);
};

export const numberToWords = (num: number) => {
    // Placeholder logic. In a real app, use a library like 'number-to-words'
    return "Nineteen Thousand Four Hundred And Ninety-Eight Rupees Only";
};