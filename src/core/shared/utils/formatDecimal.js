export const formatGuarani = (value) => {
    const number = Number(value);
    if (isNaN(number)) return '0';
    const integerPart = Math.round(number).toString();
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatGuaraniWithSymbol = (value) => {
    return `Gs. ${formatGuarani(value)}`;
};