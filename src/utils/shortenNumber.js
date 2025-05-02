/**
 * Shorten the number to a more readable format
 * @param {number} number - The number to shorten
 * @param {number} digits - The number of decimal places to keep
 */

const shortenNumber = (number, digits) => {
    const units = ['K', 'M', 'B', 'T'];
    const factor = Math.pow(10, digits);
    let unitIndex = -1;
    let shortenedNumber = number;

    while (Math.abs(shortenedNumber) >= 1000 && unitIndex < units.length - 1) {
        shortenedNumber /= 1000;
        unitIndex++;
    }

    shortenedNumber = Math.round(shortenedNumber * factor) / factor;

    return unitIndex === -1
        ? number.toString()
        : `${shortenedNumber}${units[unitIndex]}`;
};

export default shortenNumber;
