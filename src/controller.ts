/*
  A controller of user's input
*/

import { Expression } from './expression';

const NUMBERS = '0123456789';
const OPERATORS = '-+*/%^';
const OPERATORS_WITHOUT_MINUS = OPERATORS.substring(1, OPERATORS.length);
const NUMBER_PRECEDENTS = NUMBERS + OPERATORS + '.neg(';
const RIGHT_PAREN_PRECEDENTS = NUMBERS + ')';
const BINARY_OPERATOR_PRECEDENTS = NUMBERS + OPERATORS + ')';
const UNARY_OPERATOR_PRECEDENTS = OPERATORS + 'neg(';
const MINUS_OPERATOR_PRECEDENTS = NUMBERS + OPERATORS_WITHOUT_MINUS + '()';

export class Controller {
  private readonly MAX_LENGTH_OF_FORMULA: number;

  private dotAdded_: boolean;
  private formula_: Expression;
  private expression_: Expression;

  constructor(maxLengthOfFormula: number = 30) {
    this.MAX_LENGTH_OF_FORMULA = maxLengthOfFormula;

    this.dotAdded_ = false;
    this.formula_ = new Expression();
    this.expression_ = new Expression();
  }

  get dotAdded(): boolean {
    return this.dotAdded_;
  }

  get formula(): Expression {
    return this.formula_;
  }

  get expression(): Expression {
    return this.expression_;
  }

  public clear(): void {
    this.dotAdded_ = false;
    this.expression_.clear();
    this.formula_.clear();
  }

  public validate(): boolean {
    return this.expression_.matchesParen() && !this.expression_.endsWith('-+*/%^.neg(');
  }

  public process(id: string, text: string): boolean {
    // Predicates to check if users' inputs can be added

    const dotCanFollow = (last: string): boolean => {
      return last !== "" && (NUMBERS.indexOf(last.trim()) !== -1) && (this.dotAdded_ !== true);
    };
    const numberCanFollow = (last: string): boolean => {
      return NUMBER_PRECEDENTS.indexOf(last.trim()) !== -1;
    };
    const rightParenCanFollow = (last: string): boolean => {
      return last !== "" && RIGHT_PAREN_PRECEDENTS.indexOf(last.trim()) !== -1;
    };
    const binaryCanFollow = (last: string): boolean => {
      this.dotAdded_ = false;
      return last !== "" && BINARY_OPERATOR_PRECEDENTS.indexOf(last.trim()) !== -1;
    };
    const unaryCanFollow = (last: string): boolean => {
      return UNARY_OPERATOR_PRECEDENTS.indexOf(last.trim()) !== -1;
    };
    const minusCanFollow = (last: string): boolean => {
      return MINUS_OPERATOR_PRECEDENTS.indexOf(last.trim()) !== -1;
    };
    const pad = (value: string): string => {
      return ' ' + value + ' ';
    };

    // If the length of the formula reaches its maximum length, users' input will not be processes.

    const formula = this.formula_.toString();
    if (id !== 'CA' && id !== 'CE' && this.MAX_LENGTH_OF_FORMULA <= formula.length) {
      return false;
    }

    // Process users' input
    if (id === 'CA') {
      this.formula_.clear();
      this.expression_.clear();
      this.dotAdded_ = false;
    } else if (id === 'CE') {
      const element = this.formula_.pop();
      if (element === '.') {
        this.dotAdded_ = false;
      }
      this.expression_.pop();
    } else if (id === '.') {
      if (!dotCanFollow(this.expression_.last())) {
        return false;
      }
      this.dotAdded_ = true;
      this.formula_.push(id);
      this.expression_.push(id);
    } else if (NUMBERS.indexOf(id) !== -1) {
      if (!numberCanFollow(this.expression_.last())) {
        return false;
      }
      this.formula_.push(id);
      this.expression_.push(id);
    } else if (id === '(') {
      if (!unaryCanFollow(this.expression_.last())) {
        return false;
      }
      this.formula_.push(id);
      this.expression_.push(id);
    } else if (id === 'ln' || id === 'log') {
      if (!unaryCanFollow(this.expression_.last())) {
        return false;
      }
      this.formula_.push(id); this.formula_.push('(');
      this.expression_.push(id); this.expression_.push('(');
    } else if (id === 'sqrt') {
      if (!unaryCanFollow(this.expression_.last())) {
        return false;
      }
      this.formula_.push(text); this.formula_.push('(');
      this.expression_.push(pad(id)); this.expression_.push('(');
    } else if (id === ')') {
      if (!rightParenCanFollow(this.expression_.last()) || this.expression_.matchesParen()) {
        return false;
      }
      this.formula_.push(id);
      this.expression_.push(id);
    } else if (id === '+' || id === '/' || id === '*') {
      if (!binaryCanFollow(this.expression_.last())) {
        return false;
      }
      if (OPERATORS.indexOf(this.expression_.last().trim()) !== -1) {
        this.formula_.pop();
        this.expression_.pop();
      }
      this.formula_.push(pad(text));
      this.expression_.push(pad(id));
    } else if (id === '-') {
      if (!minusCanFollow(this.expression_.last())) {
        return false;
      }

      const last = this.expression_.last().trim();
      if (last === '+') {
        this.formula_.pop(); this.formula_.push(pad(text));
        this.expression_.pop(); this.expression_.push(pad(id));
      } else if (last === "" || last === '*' || last === '/' || last === '%' || last === '^' || last === '(') {
        this.formula_.push(id);
        this.expression_.push(pad('neg'));
      } else {
        this.formula_.push(pad(id));
        this.expression_.push(pad(id));
      }
    } else if (id === '%') {
      if (!binaryCanFollow(this.expression_.last())) {
        return false;
      }
      if (OPERATORS.indexOf(this.expression_.last().trim()) !== -1) {
        this.formula_.pop();
        this.expression_.pop();
      }
      const modulo = pad(id);
      this.formula_.push(modulo);
      this.expression_.push(modulo);
    } else if (id === '^') {
      if (!binaryCanFollow(this.expression_.last())) {
        return false;
      }
      if (OPERATORS.indexOf(this.expression_.last().trim()) !== -1) {
        this.formula_.pop();
        this.expression_.pop();
      }
      this.formula_.push(id); this.formula_.push('(');
      this.expression_.push(pad(id)); this.expression_.push('(');
    } else {
      this.formula_.push(id);
      this.expression_.push(id);
    }

    return true;
  }
}
