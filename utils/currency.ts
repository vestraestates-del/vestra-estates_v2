export const parseCurrencyValue = (valueString: string): { value: number, suffix: string } => {
    const numericPart = parseFloat(valueString.replace(/[^0-9.]/g, ''));
    let suffix = '';

    if (valueString.toUpperCase().includes('M')) {
        suffix = 'M';
    } else if (valueString.toUpperCase().includes('K')) {
        suffix = 'K';
    }

    return {
        value: isNaN(numericPart) ? 0 : numericPart,
        suffix: suffix
    };
};
