import { expect } from 'chai';
import * as mocha from 'mocha';
import { Calculator, Operator } from '../src/calculator';

describe("Calculator", () => {

  let calculator: Calculator<number>;

  beforeEach(() => {
    calculator = new Calculator<number>();
  });

  describe("Primitive Operators", () => {

    describe ("Addition", () => {
      it ("should be able to add integers.", () => {
        const result = calculator.eval('1 + 1');
        expect(result).to.equal(2);
      });

      it ("should be able to add fraction numbers.", () => {
        const result = calculator.eval('0.1 + 0.1');
        expect(result).to.equal(0.2);
      });

      it ("should be able to add integers and fraction numbers.", () => {
        const result = calculator.eval('1 + 0.1');
        expect(result).to.equal(1.1);
      });
    });

    describe ("Subtraction", () => {
      it ("should be able to subtract integers from integers.", () => {
        const result = calculator.eval('2 - 1');
        expect(result).to.equal(1);
      });

      it ("should be able to subtract fraction numbers from fraction numbers.", () => {
        const result = calculator.eval('0.2 - 0.1');
        expect(result).to.equal(0.1);
      });

      it ("should be able to subtract fractoin numbers form integers.", () => {
        const result = calculator.eval('1 - 0.1');
        expect(result).to.equal(0.9);
      });
    });

    describe ("Multiplication", () => {
      it ("should be able to multiply integers by integers.", () => {
        const result = calculator.eval('2 * 1');
        expect(result).to.equal(2);
      });

      it ("should be able to multiply fraction numbers by fraction numbers.", () => {
        const result = calculator.eval('0.9 * 0.3');
        expect(result).to.equal(0.27);
      });

      it ("should be able to multiply integers by fraction numbers.", () => {
        const result = calculator.eval('1 * 0.1');
        expect(result).to.equal(0.1);
      });
    });

    describe ("Division", () => {
      it ("should be able to divide integers by integers.", () => {
        const result = calculator.eval('4 / 2');
        expect(result).to.equal(2);
      });

      it ("should be able to divide fraction numbers by fraction numbers.", () => {
        const result = calculator.eval('0.9 / 0.8');
        expect(result).to.equal(1.125);
      });

      it ("should be able to divide integers by fraction numbers.", () => {
        const result = calculator.eval('1 / 0.1');
        expect(result).to.equal(10);
      });
    });

    describe ("Modulo", () => {
      it ("should be able to calculate a modulo of integers.", () => {
        const result = calculator.eval('5 % 2');
        expect(result).to.equal(1);
      });

      it ("should be able to calculate a modulo of fraction numbers.", () => {
        const result = calculator.eval('0.6 % 0.3');
        expect(result).to.equal(0);
      });

    });
  });

  describe ("Unary Operators", () => {

    describe ("Logarithm (Base 10)", () => {
      it ("should be able to calculate a logarithm (base 10) of integers.", () => {
        const result = calculator.eval('log(10)');
        expect(result).to.equal(1);
      });

      it ("should be able to calculate a logarithm (base 10) of fraction numbers.", () => {
        const result = calculator.eval('log(0.5)');
        expect(result).to.equal(-0.30102999566398114);
      });

    });

    describe ("Logarithm (Base e)", () => {
      it ("should be able to calculate a logarithm (Base e) of integers.", () => {
        const result = calculator.eval('ln(10)');
        expect(result).to.equal(2.302585092994046);
      });

      it ("should be able to calculate a logarithm (Base e) of fraction numbers.", () => {
        const result = calculator.eval('ln(2.718281828459045)');
        expect(result).to.equal(1);
      });

    });

    describe ("Square Root", () => {
      it ("should be able to calculate a squareRoot of integers.", () => {
        const result = calculator.eval('squareRoot(4)');
        expect(result).to.equal(2);
      });

      it ("should be able to calculate a squareRoot of fraction numbers.", () => {
        const result = calculator.eval('squareRoot(0.25)');
        expect(result).to.equal(0.5);
      });

      it ("should be able to calculate a squareRoot using its alias.", () => {
        const result = calculator.eval('sqrt(0.25)');
        expect(result).to.equal(0.5);
      });
    });

    describe ("Negation", () => {
      it ("should be able to calculate a negation of integers.", () => {
        const result = calculator.eval('negated(4)');
        expect(result).to.equal(-4);
      });

      it ("should be able to calculate a negation of fraction numbers.", () => {
        const result = calculator.eval('negated(0.25)');
        expect(result).to.equal(-0.25);
      });

      it ("should be able to calculate a negation using its alias.", () => {
        const result = calculator.eval('neg(0.25)');
        expect(result).to.equal(-0.25);
      });
    });
  });

  describe("Binary Operators", () => {

    describe ("Power", () => {
      it ("should be able to calculate a power of integers.", () => {
        const result = calculator.eval('2 toPower 2');
        expect(result).to.equal(4);
      });

      it ("should be able to calculate a power of fraction numbers.", () => {
        const result = calculator.eval('0.1 toPower 0.5');
        expect(result).to.equal(0.31622776601683794);
      });

      it ("should be able to calculate a power using its alias.", () => {
        const result = calculator.eval('0.1 pow 0.5');
        expect(result).to.equal(0.31622776601683794);
      });

      it ("should be able to calculate a power using its alias.", () => {
        const result = calculator.eval('0.1 ^ 0.5');
        expect(result).to.equal(0.31622776601683794);
      });
    });
  });

  describe ("Parsing", () => {
    it ("should make multiplication precede before addition.", () => {
      const result = calculator.eval('4 + 2 * 3');
      expect(result).to.equal(10);
    });

    it ("should make multiplication precede before subtraction.", () => {
      const result = calculator.eval('8 - 2 * 3');
      expect(result).to.equal(2);
    });

    it ("should make division precede before addition.", () => {
      const result = calculator.eval('4 + 6 / 3');
      expect(result).to.equal(6);
    });

    it ("should make division precede before subtraction.", () => {
      const result = calculator.eval('4 - 6 / 3');
      expect(result).to.equal(2);
    });

    it ("should make modulo precede before addition.", () => {
      const result = calculator.eval('4 + 7 % 3');
      expect(result).to.equal(5);
    });

    it ("should make modulo precede before subtraction.", () => {
      const result = calculator.eval('4 - 7 % 3');
      expect(result).to.equal(3);
    });

    it ("should make precedence of multiplication, division and modulo equivalent.", () => {
      const result = calculator.eval('4 * 7 % 3');
      expect(result).to.equal(1);
    });

    it ("should make binary operatoin precede before addition.", () => {
      const result = calculator.eval('4 + 2 toPower 3');
      expect(result).to.equal(12);
    });

    it ("should make binary operation precede before subtraction.", () => {
      const result = calculator.eval('16 - 2 toPower 3');
      expect(result).to.equal(8);
    });

    it ("should make binary operation precede before multiplication.", () => {
      const result = calculator.eval('2 * 2 toPower 3');
      expect(result).to.equal(16);
    });

    it ("should make binary operation precede before division.", () => {
      const result = calculator.eval('16 / 2 toPower 3');
      expect(result).to.equal(2);
    });

    it ("should make unary operation precede before binary operation.", () => {
      const result = calculator.eval('2 toPower negated(2)');
      expect(result).to.equal(0.25);
    });

    it ("should make parenthesis precede before binary operation.", () => {
      const result = calculator.eval('2 toPower (3 + 1)');
      expect(result).to.equal(16);
    });
  });

  describe ("Exception", () => {
    it ("should be thrown when the operator does not have supported operation.", () => {
      const operator: Operator<number> = {};
      for (const opval of calculator.opvals) {
        operator[opval] = (x: number): number => 0;
      }

      let thrown = false;
      for (const opval of calculator.opvals) {
        thrown = false;
        const original = operator[opval];
        operator[opval] = undefined;
        try {
          calculator.reset(operator);
        } catch (e) {
          thrown = true;
        }
        operator[opval] = original;
      }
      expect(thrown).to.equal(true);
    });

    it ("should be thrown when the operator is not assigned.", () => {
      let thrown = false;
      try {
        calculator.reset(undefined);
        calculator.eval('1 + 1');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).to.equal(true);
    });

    it ("should be thrown when an object that is neither string literal nor String object is passed to eval().", () => {
      let thrown = false;
      try {
        const a: any = null;
        calculator.eval(a);
      } catch (e) {
        thrown = true;
      }
      expect(thrown).to.equal(true);
    });

    it ("should be thrown when an unsupported operation is tried to be processed.", () => {
      let thrown = false;
      try {
        calculator.eval('hoge(1)');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).to.equal(true);
    });

    it ("should be thrown when an unsupported primitive type operator is tried to be processed.", () => {
      let thrown = false;
      try {
        calculator.eval('!1');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).to.equal(true);
    });

    it ("should be thrown when one of operators throws an exception.", () => {
      const operator: Operator<number> = {};
      for (const opval of calculator.opvals) {
        operator[opval] = () => { throw new Error(); };
      }

      let thrown = false;
      try {
        calculator.reset(operator);
        calculator.eval('1 + 1');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).to.equal(true);
    });
  });
});
