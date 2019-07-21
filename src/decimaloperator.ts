/*
  A custom operator that handles big integers

  This implementation depends on the following library.
  https://github.com/MikeMcl/decimal.js/
*/

import { Decimal } from 'decimal.js';
import { Operator } from "./Calculator";

Decimal.config({ precision: 10, minE: -1e+9, maxE: 1e+9 });

export const DecimalOperator: Operator<Decimal> = {

  num: (v: number | string): Decimal => {
    return new Decimal(String(v));
  },

  plus: (x: Decimal, y: Decimal): Decimal => {
    return x.plus(y);
  },

  minus: (x: Decimal, y: Decimal): Decimal => {
    return x.minus(y);
  },

  times: (x: Decimal, y: Decimal): Decimal => {
    return x.times(y);
  },

  dividedBy: (x: Decimal, y: Decimal): Decimal => {
    return x.dividedBy(y);
  },

  modulo: (x: Decimal, y: Decimal): Decimal => {
    return x.modulo(y);
  },

  toPower: (x: Decimal, y: Decimal): Decimal => {
      return x.pow(y);
  },

  squareRoot: (v: Decimal): Decimal => {
    return v.sqrt();
  },

  log: (v: Decimal): Decimal => {
    return Decimal.log10(v);
  },

  ln: (v: Decimal): Decimal => {
    return Decimal.ln(v);
  },

  negated: (v: Decimal): Decimal => {
    return v.negated();
  },
};
