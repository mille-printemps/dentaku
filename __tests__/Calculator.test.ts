import { Decimal } from 'decimal.js';
import { Calculator } from '../src/Calculator';
import { calculateNumber, calculateDecimal } from '../src/operator';

describe('Calculator', () => {

  let calculator: Calculator<number>;
  let decimalCalculator: Calculator<Decimal>;

  beforeEach(() => {
    calculator = new Calculator<number>(calculateNumber);
    decimalCalculator = new Calculator<Decimal>(calculateDecimal);
  });

  describe('Primitive Operators', () => {
    describe('Addition', () => {
      test('should be able to add integers.', () => {
        const add = '1 + 1';
        const result = calculator.eval(add);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(add);
        expect(decimalResult.toNumber()).toEqual(2);
      });

      test('should be able to add fraction numbers.', () => {
        const add = '0.1 + 0.1';
        const result = calculator.eval(add);
        expect(result).toEqual(0.2);

        const decimalResult = decimalCalculator.eval(add);
        expect(decimalResult.toNumber()).toEqual(0.2);
      });

      test('should be able to add integers and fraction numbers.', () => {
        const add = '1 + 0.1';
        const result = calculator.eval(add);
        expect(result).toEqual(1.1);

        const decimalResult = decimalCalculator.eval(add);
        expect(decimalResult.toNumber()).toEqual(1.1);
      });
    });

    describe('Subtraction', () => {
      test('should be able to subtract integers from integers.', () => {
        const sub = '2 - 1';
        const result = calculator.eval(sub);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(sub);
        expect(decimalResult.toNumber()).toEqual(1);
      });

      test('should be able to subtract fraction numbers from fraction numbers.', () => {
        const sub = '0.2 - 0.1';
        const result = calculator.eval(sub);
        expect(result).toEqual(0.1);

        const decimalResult = decimalCalculator.eval(sub);
        expect(decimalResult.toNumber()).toEqual(0.1);
      });

      test('should be able to subtract fractoin numbers form integers.', () => {
        const sub = '1 - 0.1';
        const result = calculator.eval(sub);
        expect(result).toEqual(0.9);

        const decimalResult = decimalCalculator.eval(sub);
        expect(decimalResult.toNumber()).toEqual(0.9);
      });
    });

    describe('Multiplication', () => {
      test('should be able to multiply integers by integers.', () => {
        const mul = '2 * 1';
        const result = calculator.eval(mul);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(mul);
        expect(decimalResult.toNumber()).toEqual(2);
      });

      test('should be able to multiply fraction numbers by fraction numbers.', () => {
        const mul = '0.9 * 0.3';
        const result = calculator.eval(mul);
        expect(result).toEqual(0.27);

        const decimalResult = decimalCalculator.eval(mul);
        expect(decimalResult.toNumber()).toEqual(0.27);
      });

      test('should be able to multiply integers by fraction numbers.', () => {
        const mul = '1 * 0.1';
        const result = calculator.eval(mul);
        expect(result).toEqual(0.1);

        const decimalResult = decimalCalculator.eval(mul);
        expect(decimalResult.toNumber()).toEqual(0.1);
      });
    });

    describe('Division', () => {
      test('should be able to divide integers by integers.', () => {
        const div = '4 / 2';
        const result = calculator.eval(div);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(div);
        expect(decimalResult.toNumber()).toEqual(2);
      });

      test('should be able to divide fraction numbers by fraction numbers.', () => {
        const div = '0.9 / 0.8';
        const result = calculator.eval(div);
        expect(result).toEqual(1.125);

        const decimalResult = decimalCalculator.eval(div);
        expect(decimalResult.toNumber()).toEqual(1.125);
      });

      test('should be able to divide integers by fraction numbers.', () => {
        const div = '1 / 0.1';
        const result = calculator.eval(div);
        expect(result).toEqual(10);

        const decimalResult = decimalCalculator.eval(div);
        expect(decimalResult.toNumber()).toEqual(10);
      });
    });

    describe('Modulo', () => {
      test('should be able to calculate a modulo of integers.', () => {
        const mod = '5 % 2';
        const result = calculator.eval(mod);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(mod);
        expect(decimalResult.toNumber()).toEqual(1);
      });

      test('should be able to calculate a modulo of fraction numbers.', () => {
        const mod = '0.6 % 0.3';
        const result = calculator.eval(mod);
        expect(result).toEqual(0);

        const decimalResult = decimalCalculator.eval(mod);
        expect(decimalResult.toNumber()).toEqual(0);
      });
    });
  });

  describe('Unary Operators', () => {
    describe('Logarithm (Base 10)', () => {
      test('should be able to calculate a logarithm (base 10) of integers.', () => {
        const log10 = 'log(10)';
        const result = calculator.eval(log10);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(log10);
        expect(decimalResult.toNumber()).toEqual(1);
      });

      test('should be able to calculate a logarithm (base 10) of fraction numbers.', () => {
        const log10 = 'log(0.5)';
        const result = calculator.eval(log10);
        expect(result).toEqual(-0.30102999566398114);

        const decimalResult = decimalCalculator.eval(log10);
        expect(decimalResult.toNumber()).toEqual(-0.3010299956639812);
      });
    });

    describe('Logarithm (Base e)', () => {
      test('should be able to calculate a logarithm (Base e) of integers.', () => {
        const loge = 'ln(10)';
        const result = calculator.eval(loge);
        expect(result).toEqual(2.302585092994046);

        const decimalResult = decimalCalculator.eval(loge);
        expect(decimalResult.toNumber()).toEqual(2.302585092994046);
      });

      test('should be able to calculate a logarithm (Base e) of fraction numbers.', () => {
        const loge = 'ln(2.7182818284590451)';
        const result = calculator.eval(loge);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(loge);
        expect(decimalResult.toNumber()).toEqual(1);
      });
    });

    describe('Square Root', () => {
      test('should be able to calculate a squareRoot of integers.', () => {
        const sqrt = 'squareRoot(4)';
        const result = calculator.eval(sqrt);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(sqrt);
        expect(decimalResult.toNumber()).toEqual(2);
      });

      test('should be able to calculate a squareRoot of fraction numbers.', () => {
        const sqrt = 'squareRoot(0.25)';
        const result = calculator.eval(sqrt);
        expect(result).toEqual(0.5);

        const decimalResult = decimalCalculator.eval(sqrt);
        expect(decimalResult.toNumber()).toEqual(0.5);
      });

      test('should be able to calculate a squareRoot using its alias.', () => {
        const sqrt = 'sqrt(0.25)';
        const result = calculator.eval(sqrt);
        expect(result).toEqual(0.5);

        const decimalResult = decimalCalculator.eval(sqrt);
        expect(decimalResult.toNumber()).toEqual(0.5);
      });
    });

    describe('Negation', () => {
      test('should be able to calculate a negation of integers.', () => {
        const neg = 'negated(4)';
        const result = calculator.eval(neg);
        expect(result).toEqual(-4);

        const decimalResult = decimalCalculator.eval(neg);
        expect(decimalResult.toNumber()).toEqual(-4);
      });

      test('should be able to calculate a negation of fraction numbers.', () => {
        const neg = 'negated(0.25)';
        const result = calculator.eval(neg);
        expect(result).toEqual(-0.25);

        const decimalResult = decimalCalculator.eval(neg);
        expect(decimalResult.toNumber()).toEqual(-0.25);
      });

      test('should be able to calculate a negation using its alias.', () => {
        const neg = 'neg(0.25)';
        const result = calculator.eval(neg);
        expect(result).toEqual(-0.25);

        const decimalResult = decimalCalculator.eval(neg);
        expect(decimalResult.toNumber()).toEqual(-0.25);
      });
    });
  });

  describe('Binary Operators', () => {
    describe('Addition', () => {
      test('should be able to add integers', () => {
        const add = '1 plus 1';
        const result = calculator.eval(add);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(add);
        expect(decimalResult.toNumber()).toEqual(2);
      })
    });

    describe('Subtraction', () => {
      test('should be able to subtract integers from integers.', () => {
        const sub = '2 minus 1';
        const result = calculator.eval(sub);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(sub);
        expect(decimalResult.toNumber()).toEqual(1);
      });
    });

    describe('Multiplication', () => {
      test('should be able to multiply integers by integers.', () => {
        const mul = '2 times 1';
        const result = calculator.eval(mul);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(mul);
        expect(decimalResult.toNumber()).toEqual(2);
      });
    });

    describe('Division', () => {
      test('should be able to divide integers by integers.', () => {
        const div = '4 dividedBy 2';
        const result = calculator.eval(div);
        expect(result).toEqual(2);

        const decimalResult = decimalCalculator.eval(div);
        expect(decimalResult.toNumber()).toEqual(2);
      });
    });

    describe('Modulo', () => {
      test('should be able to calculate a modulo of integers.', () => {
        const mod = '5 modulo 2';
        const result = calculator.eval(mod);
        expect(result).toEqual(1);

        const decimalResult = decimalCalculator.eval(mod);
        expect(decimalResult.toNumber()).toEqual(1);
      });
    });

    describe('Power', () => {
      test('should be able to calculate a power of integers.', () => {
        const pow = '2 toPower 2';
        const result = calculator.eval(pow);
        expect(result).toEqual(4);

        const decimalResult = decimalCalculator.eval(pow);
        expect(decimalResult.toNumber()).toEqual(4);
      });

      test('should be able to calculate a power of fraction numbers.', () => {
        const pow = '0.1 toPower 0.5';
        const result = calculator.eval(pow);
        expect(result).toEqual(0.31622776601683794);

        const decimalResult = decimalCalculator.eval(pow);
        expect(decimalResult.toNumber()).toEqual(0.31622776601683794);
      });

      test('should be able to calculate a power using its alias.', () => {
        const pow = '0.1 pow 0.5';
        const result = calculator.eval(pow);
        expect(result).toEqual(0.31622776601683794);

        const decimalResult = decimalCalculator.eval(pow);
        expect(decimalResult.toNumber()).toEqual(0.31622776601683794);
      });

      test('should be able to calculate a power using its alias.', () => {
        const pow = '0.1 ^ 0.5';
        const result = calculator.eval(pow);
        expect(result).toEqual(0.31622776601683794);

        const decimalResult = decimalCalculator.eval(pow);
        expect(decimalResult.toNumber()).toEqual(0.31622776601683794);
      });
    });
  });

  describe('Parsing', () => {
    test('should make multiplication precede before addition.', () => {
      const result = calculator.eval('4 + 2 * 3');
      expect(result).toEqual(10);
    });

    test('should make multiplication precede before subtraction.', () => {
      const result = calculator.eval('8 - 2 * 3');
      expect(result).toEqual(2);
    });

    test('should make division precede before addition.', () => {
      const result = calculator.eval('4 + 6 / 3');
      expect(result).toEqual(6);
    });

    test('should make division precede before subtraction.', () => {
      const result = calculator.eval('4 - 6 / 3');
      expect(result).toEqual(2);
    });

    test('should make modulo precede before addition.', () => {
      const result = calculator.eval('4 + 7 % 3');
      expect(result).toEqual(5);
    });

    test('should make modulo precede before subtraction.', () => {
      const result = calculator.eval('4 - 7 % 3');
      expect(result).toEqual(3);
    });

    test('should make precedence of multiplication, division and modulo equivalent.', () => {
      const result = calculator.eval('4 * 7 % 3');
      expect(result).toEqual(1);
    });

    test('should make binary operatoin precede before addition.', () => {
      const result = calculator.eval('4 + 2 toPower 3');
      expect(result).toEqual(12);
    });

    test('should make binary operation precede before subtraction.', () => {
      const result = calculator.eval('16 - 2 toPower 3');
      expect(result).toEqual(8);
    });

    test('should make binary operation precede before multiplication.', () => {
      const result = calculator.eval('2 * 2 toPower 3');
      expect(result).toEqual(16);
    });

    test('should make binary operation precede before division.', () => {
      const result = calculator.eval('16 / 2 toPower 3');
      expect(result).toEqual(2);
    });

    test('should make unary operation precede before binary operation.', () => {
      const result = calculator.eval('2 toPower negated(2)');
      expect(result).toEqual(0.25);
    });

    test('should make parenthesis precede before binary operation.', () => {
      const result = calculator.eval('2 toPower (3 + 1)');
      expect(result).toEqual(16);
    });
  });

  describe('Exception', () => {
    test('should be thrown when an object that is neither string literal nor String object is passed to eval().', () => {
      let thrown = false;
      try {
        const a: any = null;
        calculator.eval(a);
      } catch (e) {
        thrown = true;
      }
      expect(thrown).toEqual(true);
    });

    test('should be thrown when an unsupported operation is tried to be processed.', () => {
      let thrown = false;
      try {
        calculator.eval('hoge(1)');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).toEqual(true);
    });

    test('should be thrown when an unsupported primitive type operator is tried to be processed.', () => {
      let thrown = false;
      try {
        calculator.eval('!1');
      } catch (e) {
        thrown = true;
      }
      expect(thrown).toEqual(true);
    });
  });
});
