export function formatCurrency(
    value: number,
    currencyCode: 'VND' | 'USD'
): string {
    let currencyFormat;
    if (currencyCode === 'VND') {
        currencyFormat = 'vi-VN';
    } else if (currencyCode === 'USD') {
        currencyFormat = 'en-US';
    } else {
        throw new Error('Unsupported currency code');
    }

    return value.toLocaleString(currencyFormat, {
        style: 'currency',
        currency: currencyCode,
    });
}
