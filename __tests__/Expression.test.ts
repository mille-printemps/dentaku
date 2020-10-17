import { Expression } from '../src/Expression';

describe('Expression', () => {
  let expression: Expression;

  beforeEach(() => {
    expression = new Expression();
  });

  describe('Push', () => {
    test('should be able to get one item when it is pushed.', () => {
      expect(expression.length()).toEqual(0);
      expression.push('foo');
      expect(expression.length()).toEqual(1);
    });
  });

  describe('Pop', () => {
    test('should be able to pop one item safely when its length is zero.', () => {
      const value = expression.pop();
      expect(value).toEqual('');
    });

    test('should be able to return one item when popped.', () => {
      const original = 'foo';
      expression.push(original);
      const length = expression.length();
      const popped = expression.pop();

      expect(expression.length()).toEqual(length - 1);
      expect(popped).toEqual(original);
    });
  });

  describe('Last', () => {
    test('should be able to return the last item.', () => {
      const value = 'foo';
      expression.push(value);
      expect(expression.last()).toEqual(value);
    });
  });

  describe('Clear', () => {
    test('should be able to reset its length to zero.', () => {
      expression.push('foo');
      expression.push('(');
      expression.clear();
      expect(expression.length()).toEqual(0);
    });
  });

  describe('MatchesParen', () => {
    test('should be able to check the number of left and right parentheses.', () => {
      expect(expression.matchesParen()).toEqual(true);
      expression.push('(');
      expect(expression.matchesParen()).toEqual(false);
      expression.push(')');
      expect(expression.matchesParen()).toEqual(true);
    });
  });

  describe('EndsWith', () => {
    test('should be able to check if it ends with one of targets passed.', () => {
      const target = 'abcd';
      expression.push('a');
      expect(expression.endsWith(target)).toEqual(true);

      expression.push('abc');
      expect(expression.endsWith(target)).toEqual(true);

      expression.push('bcde');
      expect(expression.endsWith(target)).toEqual(false);
    });
  });

  describe('ToString', () => {
    test('should be able to serialize itself.', () => {
      const one = 'one';
      const two = 'two';
      expression.push(one);
      expression.push(two);
      expect(expression.toString()).toEqual(one + two);
    });
  });
});
