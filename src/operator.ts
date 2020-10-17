import { Operator, match } from './types';
import { Decimal } from 'decimal.js';

export const calculateNumber = (operator: Operator<number>): number => match(operator, {
    num:        ({ x }) => parseFloat(String(x)),
    log:        ({ x }) => Math.log(x) / Math.LN10,
    ln:         ({ x }) => Math.log(x),
    squareRoot: ({ x }) => Math.sqrt(x),
    sqrt:       ({ x }) => Math.sqrt(x),
    negated:    ({ x }) => -1 * x,
    neg:        ({ x }) => -1 * x,
    plus:       ({ x, y }) => x + y,
    minus:      ({ x, y }) => x - y,
    times:      ({ x, y }) => x * y,
    dividedBy:  ({ x, y }) => x / y,
    modulo:     ({ x, y }) => x % y,
    toPower:    ({ x, y }) => Math.pow(x, y),
    pow:        ({ x, y }) => Math.pow(x, y),
    '+':        ({ x, y }) => x + y,
    '-':        ({ x, y }) => x - y,
    '*':        ({ x, y }) => x * y,
    '/':        ({ x, y }) => x / y,
    '%':        ({ x, y }) => x % y,
    '^':        ({ x, y }) => Math.pow(x, y)
});

export const calculateDecimal = (operator: Operator<Decimal>): Decimal => match(operator, {
    num:        ({ x }) => new Decimal(String(x)),
    log:        ({ x }) => Decimal.log10(x),
    ln:         ({ x }) => Decimal.ln(x),
    squareRoot: ({ x }) => x.sqrt(),
    sqrt:       ({ x }) => x.sqrt(),
    negated:    ({ x }) => x.negated(),
    neg:        ({ x }) => x.negated(),
    plus:       ({ x, y }) => x.plus(y),
    minus:      ({ x, y }) => x.minus(y),
    times:      ({ x, y }) => x.times(y),
    dividedBy:  ({ x, y }) => x.dividedBy(y),
    modulo:     ({ x, y }) => x.modulo(y),
    toPower:    ({ x, y }) => x.pow(y),
    pow:        ({ x, y }) => x.pow(y),
    '+':        ({ x, y }) => x.plus(y),
    '-':        ({ x, y }) => x.minus(y),
    '*':        ({ x, y }) => x.times(y),
    '/':        ({ x, y }) => x.dividedBy(y),
    '%':        ({ x, y }) => x.modulo(y),
    '^':        ({ x, y }) => x.pow(y)
});
