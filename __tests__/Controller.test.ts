import { Controller } from '../src/Controller';

describe('Controller', () => {
  const NUMBERS = '0123456789';
  const BINARY_OPERATORS = '-+*/%^';
  const UNARY_OPERATORS = ['log', 'ln', 'sqrt'];
  const LEFT_PAREN = '(';
  const RIGHT_PAREN = ')';
  const NEG = 'neg';
  const CA = 'CA';
  const CE = 'CE';
  const DOT = '.';
  const ONE = '1';
  const PLUS = '+';
  const MINUS = '-';
  const SQRT = '^';

  let controller: Controller;

  beforeEach(() => {
    controller = new Controller();
  });

  describe('CA', () => {
    test('should be able to reset the controller.', () => {
      controller.process(ONE, ONE);
      expect(controller.formula.length()).toEqual(1);
      expect(controller.expression.length()).toEqual(1);

      controller.process(CA, CA);
      expect(controller.formula.length()).toEqual(0);
      expect(controller.expression.length()).toEqual(0);
      expect(controller.dotAdded).toEqual(false);
    });
  });

  describe('CE', () => {
    test('should be able to remove the last item in the cotroller.', () => {
      controller.process(ONE, ONE);

      controller.process(CE, CE);
      expect(controller.formula.length()).toEqual(0);
      expect(controller.expression.length()).toEqual(0);
    });

    test('should be able to check if the last item is a dot.', () => {
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      expect(controller.dotAdded).toEqual(true);

      controller.process(CE, CE);
      expect(controller.dotAdded).toEqual(false);
    });
  });

  describe('Dot', () => {
    test('should be processed when the last item added is a number.', () => {
      for (const num of NUMBERS) {
        controller.process(num, num);
        controller.process(DOT, DOT);

        expect(controller.formula.last()).toEqual(DOT);
        expect(controller.expression.last()).toEqual(DOT);
        expect(controller.dotAdded).toEqual(true);

        controller.clear();
      }
    });

    test('should not be processed when the last item added is something other than numbers.', () => {
      controller.process(DOT, DOT);
      expect(controller.formula.length()).toEqual(0);
      expect(controller.expression.length()).toEqual(0);

      controller.process('(', '(');
      controller.process(DOT, DOT);
      expect(controller.formula.length()).toEqual(1);
      expect(controller.expression.length()).toEqual(1);
    });

    test('should not be processed when a dot has already been added.', () => {
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);

      expect(controller.formula.last()).toEqual(ONE);
      expect(controller.expression.last()).toEqual(ONE);
    });

    test('should be processed when a dot is removed or a binary operator is added.', () => {
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);

      expect(controller.formula.last()).toEqual(ONE);
      expect(controller.expression.last()).toEqual(ONE);

      controller.process(CE, CE);
      controller.process(CE, CE);
      controller.process(DOT, DOT);
      expect(controller.formula.last()).toEqual(DOT);
      expect(controller.expression.last()).toEqual(DOT);

      controller.process(ONE, ONE);
      controller.process(PLUS, PLUS);
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      expect(controller.formula.last()).toEqual(DOT);
      expect(controller.expression.last()).toEqual(DOT);
    });

  });

  describe('Numbers', () => {
    test('should be able to be added after a number.', () => {
      for (const numi of NUMBERS) {
        controller.process(numi, numi);
        for (const numj of NUMBERS) {
          controller.process(numj, numj);
          expect(controller.formula.last()).toEqual(numj);
          expect(controller.expression.last()).toEqual(numj);
          controller.process(CE, CE);
        }
        controller.process(CE, CE);
      }
    });

    test('should be able to be added after a dot.', () => {
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      for (const num of NUMBERS) {
        controller.process(num, num);
        expect(controller.formula.last()).toEqual(num);
        expect(controller.expression.last()).toEqual(num);
        controller.process(CE, CE);
      }
    });

    test('should be able to be added after a binary operator.', () => {
      controller.process(ONE, ONE);
      for (const bop of BINARY_OPERATORS) {
        controller.process(bop, bop);
        for (const num of NUMBERS) {
          controller.process(num, num);

          expect(controller.formula.last()).toEqual(num);
          expect(controller.expression.last()).toEqual(num);
          controller.process(CE, CE);
        }
        controller.process(CE, CE);
      }
    });
  });

  describe('Unary operators and left parenthesis.', () => {
    test('should be able to be added after a binary operator', () => {
      const operators = Array.from(UNARY_OPERATORS);
      operators.push(LEFT_PAREN);
      controller.process(ONE, ONE);

      for (const bop of BINARY_OPERATORS) {
        controller.process(bop, bop);
        for (const op of operators) {
          controller.process(op, op);

          expect(controller.formula.last()).toEqual(LEFT_PAREN);
          expect(controller.expression.last()).toEqual(LEFT_PAREN);

          controller.process(CE, CE);
          controller.process(CE, CE);
        }
        controller.process(CE, CE);
      }
    });

    test('should be able to be added after "neg"', () => {
      const operators = Array.from(UNARY_OPERATORS);
      operators.push(LEFT_PAREN);
      controller.process(NEG, NEG);

      for (const op of operators) {
        controller.process(op, op);

        expect(controller.formula.last()).toEqual(LEFT_PAREN);
        expect(controller.expression.last()).toEqual(LEFT_PAREN);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should be able to be added after a left parenthesis.', () => {
      const operators = Array.from(UNARY_OPERATORS);
      operators.push(LEFT_PAREN);

      for (const op of operators) {
        controller.process(op, op);

        expect(controller.formula.last()).toEqual(LEFT_PAREN);
        expect(controller.expression.last()).toEqual(LEFT_PAREN);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should not be added after a number.', () => {
      const operators = Array.from(UNARY_OPERATORS);
      operators.push(LEFT_PAREN);

      for (const num of NUMBERS) {
        controller.process(num, num);
        for (const op of operators) {
          controller.process(op, op);

          expect(controller.formula.last()).not.toEqual(LEFT_PAREN);
          expect(controller.expression.last()).not.toEqual(LEFT_PAREN);
        }
        controller.process(CE, CE);
      }
    });
  });

  describe('Binary operators except "-" and "^"', () => {
    test('should be able to be added after numbers.', () => {
      const operators = BINARY_OPERATORS.substring(1, BINARY_OPERATORS.length - 1);
      for (const num of NUMBERS) {
        controller.process(num, num);
        for (const op of operators) {
          controller.process(op, op);

          expect(controller.formula.last().trim()).toEqual(op);
          expect(controller.expression.last().trim()).toEqual(op);
          controller.process(CE, CE);
        }
        controller.process(CE, CE);
      }
    });

    test('should be able to replace a precceeding binary operator.', () => {
      const operators = BINARY_OPERATORS.substring(1, BINARY_OPERATORS.length - 1);
      controller.process(ONE, ONE);

      for (const op of operators) {
        controller.process(op, op);

        for (const op of operators) {
          controller.process(op, op);

          expect(controller.formula.last().trim()).toEqual(op);
          expect(controller.expression.last().trim()).toEqual(op);
          controller.process(op, op);
        }
        controller.process(CE, CE);
      }
    });

    test('should be able to be added after a right parenthesis.', () => {
      const operators = BINARY_OPERATORS.substring(1, BINARY_OPERATORS.length - 1);
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(ONE, ONE);
      controller.process(PLUS, PLUS);
      controller.process(ONE, ONE);
      controller.process(RIGHT_PAREN, RIGHT_PAREN);
      for (const op of operators) {
        controller.process(op, op);

        expect(controller.formula.last().trim()).toEqual(op);
        expect(controller.expression.last().trim()).toEqual(op);
        controller.process(CE, CE);
      }
    });

    test('should not be able to be added after a left parenthesis.', () => {
      const operators = BINARY_OPERATORS.substring(1, BINARY_OPERATORS.length - 1);
      controller.process(LEFT_PAREN, LEFT_PAREN);

      for (const op of operators) {
        controller.process(op, op);

        expect(controller.formula.last().trim()).not.toEqual(op);
        expect(controller.expression.last().trim()).not.toEqual(op);
      }
    });

    test('should not be able to be added after a dot.', () => {
      const operators = BINARY_OPERATORS.substring(1, BINARY_OPERATORS.length - 1);
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);

      for (const op of operators) {
        controller.process(op, op);

        expect(controller.formula.last().trim()).not.toEqual(op);
        expect(controller.expression.last().trim()).not.toEqual(op);
      }
    });
  });

  describe('Minus', () => {
    test('should be able to replace '+' with itself.', () => {
      controller.process(ONE, ONE);
      controller.process(PLUS, PLUS);
      controller.process(MINUS, MINUS);
      expect(controller.formula.last().trim()).toEqual(MINUS);
      expect(controller.expression.last().trim()).toEqual(MINUS);
    });

    test('should be able to add "neg" after binary operators.', () => {
      const operators = BINARY_OPERATORS.substring(2, BINARY_OPERATORS.length);
      controller.process(ONE, ONE);
      for (const op of operators) {
        controller.process(op, op);
        controller.process(MINUS, MINUS);

        expect(controller.formula.last().trim()).toEqual(MINUS);
        expect(controller.expression.last().trim()).toEqual(NEG);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should be able to add "neg" after a left parenthesis.', () => {
      controller.process(ONE, ONE);
      controller.process(PLUS, PLUS);
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(MINUS, MINUS);

      expect(controller.formula.last().trim()).toEqual(MINUS);
      expect(controller.expression.last().trim()).toEqual(NEG);
    });

    test('should be able to be added after a number.', () => {
      for (const num of NUMBERS) {
        controller.process(num, num);
        controller.process(MINUS, MINUS);

        expect(controller.formula.last().trim()).toEqual(MINUS);
        expect(controller.expression.last().trim()).toEqual(MINUS);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should not be able to be added after a dot.', () => {
      controller.process(ONE, ONE);
      controller.process(DOT, DOT);
      controller.process(MINUS, MINUS);

      expect(controller.formula.last().trim()).not.toEqual(MINUS);
      expect(controller.expression.last().trim()).not.toEqual(MINUS);
    });
  });

  describe('Right parenthesis', () => {
    test('should be able to be added after a right parenthesis when it lacks.', () => {
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(ONE, ONE);
      controller.process(RIGHT_PAREN, RIGHT_PAREN);
      controller.process(RIGHT_PAREN, RIGHT_PAREN);

      expect(controller.formula.last().trim()).toEqual(RIGHT_PAREN);
      expect(controller.expression.last().trim()).toEqual(RIGHT_PAREN);
    });

    test('should be able to be added after a number when it lacks.', () => {
      controller.process(LEFT_PAREN, LEFT_PAREN);
      for (const num of NUMBERS) {
        controller.process(num, num);
        controller.process(RIGHT_PAREN, RIGHT_PAREN);

        expect(controller.formula.last().trim()).toEqual(RIGHT_PAREN);
        expect(controller.expression.last().trim()).toEqual(RIGHT_PAREN);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should not be able to be added after a binary operator even when it lacks.', () => {
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(ONE, ONE);
      for (const bop of BINARY_OPERATORS) {
        controller.process(bop, bop);
        controller.process(RIGHT_PAREN, RIGHT_PAREN);

        expect(controller.formula.last().trim()).not.toEqual(RIGHT_PAREN);
        expect(controller.expression.last().trim()).not.toEqual(RIGHT_PAREN);

        controller.process(CE, CE);
      }
    });
  });

  describe('Square root', () => {
    test('should be able to be added after a right parenthesis.', () => {
      controller.process(LEFT_PAREN, LEFT_PAREN);
      controller.process(ONE, ONE);
      controller.process(RIGHT_PAREN, RIGHT_PAREN);
      controller.process(SQRT, SQRT);

      expect(controller.formula.last().trim()).toEqual(LEFT_PAREN);
      expect(controller.expression.last().trim()).toEqual(LEFT_PAREN);
    });

    test('should be able to be added after a number.', () => {
      for (const num of NUMBERS) {
        controller.process(num, num);
        controller.process(SQRT, SQRT);

        expect(controller.formula.last().trim()).toEqual(LEFT_PAREN);
        expect(controller.expression.last().trim()).toEqual(LEFT_PAREN);

        controller.process(CE, CE);
        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });

    test('should be able to replace a binary operator with itself.', () => {
      controller.process(ONE, ONE);
      for (const bop of BINARY_OPERATORS) {
        controller.process(bop, bop);
        controller.process(SQRT, SQRT);

        expect(controller.formula.last().trim()).toEqual(LEFT_PAREN);
        expect(controller.expression.last().trim()).toEqual(LEFT_PAREN);

        controller.process(CE, CE);
        controller.process(CE, CE);
      }
    });
  });
});
