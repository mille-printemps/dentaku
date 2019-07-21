import { expect } from 'chai';
import { Decimal } from 'decimal.js';
import * as mocha from 'mocha';
import { Operator } from '../src/calculator';
import { DecimalOperator } from '../src/decimaloperator';

describe ("Operator", () => {
  let operator: Operator<Decimal>;

  beforeEach(() => {
    operator = DecimalOperator;
  });

  describe("Number", () => {
    it ("should be able to return an instance of Decimal.", () => {
      const num = operator.num(1);
      expect(num instanceof Decimal).to.equal(true);
    });
  });

  describe("Plus", () => {
    it ("should be able to add integers.", () => {
      const num = operator.plus(operator.num(1), operator.num(1));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('2');
    });
  });

  describe("Minus", () => {
    it ("should be able to subtract an integer from an integer.", () => {
      const num = operator.minus(operator.num(2), operator.num(1));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('1');
    });
  });

  describe("Times", () => {
    it ("should be able to multiply integers.", () => {
      const num = operator.times(operator.num(2), operator.num(1));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('2');
    });
  });

  describe("DividedBy", () => {
    it ("should be able to divide an integer by integer.", () => {
      const num = operator.dividedBy(operator.num(2), operator.num(2));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('1');
    });
  });

  describe("Modulo", () => {
    it ("should be able to calculate a modulo of integers.", () => {
      const num = operator.modulo(operator.num(5), operator.num(2));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('1');
    });
  });

  describe("Power", () => {
    it ("should be able to calculate a power of integers.", () => {
      const num = operator.toPower(operator.num(2), operator.num(2));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('4');
    });

    it ("should be able to calculate an integer to power to a fraction.", () => {
      const num = operator.toPower(operator.num(2), operator.num(1.5));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('2.828427125');
    });
  });

  describe("SquareRoot", () => {
    it ("should be able to calculate a square root of integers.", () => {
      const num = operator.squareRoot(operator.num(4));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('2');
    });
  });

  describe("Log", () => {
    it ("should be able to calculate a logarithm of integers (Base 10).", () => {
      const num = operator.log(operator.num(10));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('1');
    });
  });

  describe("Ln", () => {
    it ("should be able to calculate a logarithm of numbers (Base e).", () => {
      const num = operator.ln(operator.num(Math.E));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('1');
    });
  });

  describe("Negated", () => {
    it ("should be able to calculate a negative number of numbers.", () => {
      const num = operator.negated(operator.num(1));
      expect(num instanceof Decimal).to.equal(true);
      expect(num.toString()).to.equal('-1');
    });
  });
});
