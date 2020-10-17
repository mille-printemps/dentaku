/*
  An arithmetic calculator that accepts the following model

  expr -> expr + term | expr - term | term
  term -> term * subterm | term / subterm | term % subterm | subterm
  subterm -> subterm binary_op factor | factor
  factor -> unary_op factor | (expr) | num
*/

import { Arity,
         Code,
         Operator,
         OperatorSignature,
         OperatorArity,
         createOperator }
from './types';

export class Calculator<NumberType = number> {
  private readonly ARITY: OperatorArity<number> = {
    num:        'number',
    log:        'unary',
    ln:         'unary',
    squareRoot: 'unary',
    sqrt:       'unary',
    negated:    'unary',
    neg:        'unary',
    plus:       'binary',
    minus:      'binary',
    times:      'binary',
    dividedBy:  'binary',
    modulo:     'binary',
    toPower:    'binary',
    pow:        'binary',
    '+':        'binary',
    '-':        'binary',
    '*':        'binary',
    '/':        'binary',
    '%':        'binary',
    '^':        'binary',
  };
  private readonly DONE = 'done';

  private current: number;
  private end: number;
  private token: string | Arity;
  private value: string | keyof OperatorSignature<NumberType>;
  private expression: string;
  private codes: Array<Code<NumberType>>;
  private calculate: (operator: Operator<NumberType>) => NumberType;

  // Public functions
  constructor(calculate: (operator: Operator<NumberType>) => NumberType) {
    this.current = 0;
    this.end = 0;
    this.token = '';
    this.value = '';
    this.expression = '';
    this.codes = [];
    this.calculate = calculate;
  }

  public eval(expression: string): NumberType {
    this.expression = expression;
    this.current = 0;
    this.end = expression.length;
    this.codes = [];

    try {
      this.parse();

      const codes = this.codes;
      const program: NumberType[] = [];
      for (const code of codes) {
        if (code.arity === 'number') {
          const num = <NumberType>(x: number | string): Operator<NumberType> => {
            return createOperator<OperatorSignature<NumberType>>('num', { x });
          };
          program.unshift(this.calculate(num(code.value)));
        } else if (code.arity === 'unary') {
          if (!this.validate(code.value)) {
            throw new Error(`Unknown operator name: ${code.value}.`);
          }

          const name = code.value;
          const operator = <NumberType>(x: NumberType): Operator<NumberType> => {
            return createOperator<OperatorSignature<NumberType>>(name, { x });
          };
          const top = program[0];
          program.shift();
          program.unshift(this.calculate(operator(top)));
        } else if (code.arity === 'binary') {
          if (!this.validate(code.value)) {
            throw new Error(`Unknown operator name: ${code.value}.`);
          }

          const name = code.value;
          const operator = <NumberType>(x: NumberType, y: NumberType): Operator<NumberType> => {
            return createOperator<OperatorSignature<NumberType>>(name, { x, y });
          };
          const left = program[0];
          program.shift();
          const right = program[0];
          program.shift();
          program.unshift(this.calculate(operator(right, left)));
        } else {
          throw new Error(`Unknown operator type: ${code.arity}. This seems to be a bug.`);
        }
      }
      return program[0];
    } catch (e) {
      throw e;
    }
  }

  // Private functions
  private validate(name: string): name is keyof OperatorSignature<NumberType> {
    return Object.keys(this.ARITY).includes(name);
  }

  private parse(): void {
    this.token = this.lex();
    while (this.token !== this.DONE) {
      this.expr();
    }
  }

  private lex(): string | Arity {
    const isalpha = (c: string): boolean => ((('a' <= c) && (c <= 'z')) || (('A' <= c) && (c <= 'Z')));
    const isdigit = (c: string): boolean => ((('0' <= c) && (c <= '9')) || (c === '.'));
    const isalnum = (c: string): boolean => (isdigit(c) || isalpha(c));

    let c = '';
    while (true) {
      if (this.end <= this.current) {
        return this.DONE;
      }

      c = this.expression.charAt(this.current++);

      if (' ' === c) {
        continue;
      }

      if (isalnum(c)) {
        const characters: string[] = [];
        characters.push(c);
        c = this.expression.charAt(this.current++);

        let isnum = true;
        while (isalnum(c)) {
          if (isalpha(c)) {
            isnum = false;
          }
          characters.push(c);
          c = this.expression.charAt(this.current++);
        }

        this.current--;

        const token = characters.join('');
        this.value = token;

        if (isnum) {
          return 'number';
        }

        if (!this.validate(token)) {
          throw new Error(`Operator "${token}" is not supported.`);
        }

        return this.ARITY[token];
      } else {
        this.value = c;
        return c;
      }
    }
  }

  private match(token: string | Arity): void {
    if (this.token === token) {
      this.token = this.lex();
    } else {
      throw new Error(`match() tried to process a token "${token}". This seems to be a bug.`);
    }
  }

  private emit(arity: Arity, value: string | keyof OperatorSignature<NumberType>): void {
    this.codes.push({ arity, value });
  }

  private expr(): void {
    this.term();
    while (true) {
      switch (this.token) {
        case '+':
        case '-':
          const token = this.token;
          const value = this.value;
          this.match(token);
          this.term();
          this.emit('binary', value);
          continue;
        default:
          return;
      }
    }
  }

  private term(): void {
    this.subterm();
    while (true) {
      switch (this.token) {
        case '*':
        case '/':
        case '%':
          const token = this.token;
          const value = this.value;
          this.match(token);
          this.subterm();
          this.emit('binary', value);
          continue;
        default:
          return;
      }
    }
  }

  private subterm(): void {
    this.factor();
    while (true) {
      switch (this.token) {
        case '^':
        case 'binary':
          const token = this.token;
          const value = this.value;
          this.match(token);
          this.factor();
          this.emit('binary', value);
          continue;
        default:
          return;
      }
    }
  }

  private factor(): void {
    switch (this.token) {
      case 'unary':
        const token = this.token;
        const value = this.value;
        this.match(token);
        this.factor();
        this.emit('unary', value);
        break;
      case '(':
        this.match('(');
        this.expr();
        this.match(')');
        break;
      case 'number':
        this.emit('number', this.value);
        this.match('number');
        break;
      default:
        throw new Error(`Operator "${this.token}" is not supported.`);
    }
  }
}
