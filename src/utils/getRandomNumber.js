/** 
 * @description Generates a random number between min and max (inclusive).
 * @param {number} min
 * @param {number} max
*/


export default function getRandomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}