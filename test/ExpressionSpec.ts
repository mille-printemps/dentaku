import { expect } from 'chai';
import * as mocha from 'mocha';
import { Expression } from '../src/expression';

describe("Expression", () => {
  let expression: Expression;

  beforeEach(() => {
    expression = new Expression();
  });

  describe("Push", () => {
    it ("should be able to get one item when it is pushed.", () => {
      expect(expression.length()).to.equal(0);
      expression.push('foo');
      expect(expression.length()).to.equal(1);
    });
  });

  describe("Pop", () => {
    it ("should be able to pop one item safely when its length is zero.", () => {
      const value = expression.pop();
      expect(value).to.equal("");
    });

    it ("should be able to return one item when popped.", () => {
      const original = 'foo';
      expression.push(original);
      const length = expression.length();
      const popped = expression.pop();

      expect(expression.length()).to.equal(length - 1);
      expect(popped).to.equal(original);
    });
  });

  describe("Last", () => {
    it ("should be able to return the last item.", () => {
      const value = 'foo';
      expression.push(value);
      expect(expression.last()).to.equal(value);
    });
  });

  describe("Clear", () => {
    it ("should be able to reset its length to zero.", () => {
      expression.push('foo');
      expression.push('(');
      expression.clear();
      expect(expression.length()).to.equal(0);
    });
  });

  describe("MatchesParen", () => {
    it ("should be able to check the number of left and right parentheses.", () => {
      expect(expression.matchesParen()).to.equal(true);
      expression.push('(');
      expect(expression.matchesParen()).to.equal(false);
      expression.push(')');
      expect(expression.matchesParen()).to.equal(true);
    });
  });

  describe("EndsWith", () => {
    it ("should be able to check if it ends with one of targets passed.", () => {
      const target = 'abcd';
      expression.push('a');
      expect(expression.endsWith(target)).to.equal(true);

      expression.push('abc');
      expect(expression.endsWith(target)).to.equal(true);

      expression.push('bcde');
      expect(expression.endsWith(target)).to.equal(false);
    });
  });

  describe("ToString", () => {
    it ("should be able to serialize itself.", () => {
      const one = 'one';
      const two = 'two';
      expression.push(one);
      expression.push(two);
      expect(expression.toString()).to.equal(one + two);
    });
  });
});
