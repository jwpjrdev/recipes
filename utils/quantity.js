import { Fraction } from 'fraction.js';

export function multiplyValue(value, multiplier) {
    let fraction = new Fraction(value);
    return fraction.mul(multiplier).toFraction();
}

export function halfValue(value) {
    let fraction = new Fraction(value);
    return fraction.div(2).toFraction();
}