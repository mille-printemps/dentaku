/*
  An arithmetic calculator that accepts the following model

  expr -> expr + term | expr - term | term
  term -> term * subterm | term / subterm | term % subterm | subterm
  subterm -> subterm binary_op factor | factor
  factor -> unary_op factor | (expr) | num

  Usage:
  const c = new Calculator<number>();
  c.eval('1 + 1')
*/

export enum OpType {
  Number,
  Primitive,
  Unary,
  Binary,
}

export type OpValue = number | string;

export interface Operator<N = number> { [key: string]: (...args: Array<N | number | string>) => N; }

export const DefaultOperator: Operator<number> = {
  num: (v: number | string): number => {
    return parseFloat(String(v));
  },

  plus: (x: number, y: number): number => {
    return x + y;
  },

  minus: (x: number, y: number): number => {
    return x - y;
  },

  times: (x: number, y: number): number => {
    return x * y;
  },

  dividedBy: (x: number, y: number): number => {
    return x / y;
  },

  modulo: (x: number, y: number): number => {
    return x % y;
  },

  toPower: (x: number, y: number): number => {
    return Math.pow(x, y);
  },

  squareRoot: (v: number): number => {
    return Math.sqrt(v);
  },

  log: (v: number): number => {
    return Math.log(v) / Math.LN10;
  },

  ln: (v: number): number => {
    return Math.log(v);
  },

  negated: (v: number): number => {
    return -1 * v;
  },
};

interface Code {
  op: OpType;
  val: OpValue;
}

// Number operator values
const NUMBER: string = 'num';

// Primitive operator values
const PLUS: string = 'plus';
const MINUS: string = 'minus';
const TIMES: string = 'times';
const DIVIDED_BY: string = 'dividedBy';
const MODULO: string = 'modulo';

// Unary operator values
const LOG: string = 'log';
const LN: string = 'ln';
const SQUARE_ROOT: string = 'squareRoot';
const NEGATED: string = 'negated';

// Binary operator values
const TO_POWER: string = 'toPower';

// Operator aliases
const NEG: string = 'neg';
const SQRT: string = 'sqrt';
const POW: string = 'pow';

const DONE: number = 99;

export class Calculator<N = number> {
  // Conversion table for operators
  private OPERATOR_TYPE: Map<string, OpType>;
  private OPERATOR_VALUE: Map<string, OpValue>;

  // Instance variables
  private token: number | string = "";
  private value: string = "";
  private current: number = 0;
  private end: number = 0;
  private expression: string = "";
  private code: Code[] = Array<Code>();
  private operator: Operator<N>;

  // Public functions
  constructor(operator?: Operator<N>) {
    if (operator === undefined) {
      operator = DefaultOperator as any;
    }
    this.init(operator);
  }

  get opvals(): OpValue[] {
    return Array.from(this.OPERATOR_VALUE.values());
  }

  public eval(expression: string): N {
    this.expression = expression;
    this.end = expression.length;
    this.current = 0;
    this.code = Array<Code>();

    try {
      this.parse();

      const codes = this.code;
      const program: N[] = Array<N>();
      for (const code of codes) {
        if (code.op === OpType.Number) {
          program.unshift(this.operator[NUMBER](code.val));
        } else if (code.op === OpType.Primitive) {
          const left = program[0];
          program.shift();
          const right = program[0];
          program.shift();
          program.unshift(this.operator[code.val](right, left));
        } else if (code.op === OpType.Unary) {
          const top = program[0];
          program.shift();
          program.unshift(this.operator[code.val](top));
        } else if (code.op === OpType.Binary) {
          const left = program[0];
          program.shift();
          const right = program[0];
          program.shift();
          program.unshift(this.operator[code.val](right, left));
        } else {
          throw new Error(`Unknown operator type: ${code.op}. This seems to be a bug.`);
        }
      }

      return program[0];
    } catch (e) {
      throw e;
    }
  }

  public reset(operator: Operator<N>): void {
    this.init(operator);
  }

  // Private functions
  private init(operator: Operator<N>): void {

    this.OPERATOR_TYPE = new Map([
      [NUMBER,      OpType.Number],
      ['+',         OpType.Primitive],
      ['-',         OpType.Primitive],
      ['*',         OpType.Primitive],
      ['/',         OpType.Primitive],
      ['%',         OpType.Primitive],
      [LOG,         OpType.Unary],
      [LN,          OpType.Unary],
      [SQUARE_ROOT, OpType.Unary],
      [SQRT,        OpType.Unary],
      [NEGATED,     OpType.Unary],
      [NEG,         OpType.Unary],
      ['^',         OpType.Binary],
      [TO_POWER,    OpType.Binary],
      [POW,         OpType.Binary],
    ]);

    this.OPERATOR_VALUE = new Map([
      [NUMBER,      NUMBER],
      ['+',         PLUS],
      ['-',         MINUS],
      ['*',         TIMES],
      ['/',         DIVIDED_BY],
      ['%',         MODULO],
      [LOG,         LOG],
      [LN,          LN],
      [SQUARE_ROOT, SQUARE_ROOT],
      [SQRT,        SQUARE_ROOT],
      [NEGATED,     NEGATED],
      [NEG,         NEGATED],
      ['^',         TO_POWER],
      [TO_POWER,    TO_POWER],
      [POW,         TO_POWER],
    ]);

    this.operator = operator;

    for (const value of this.OPERATOR_VALUE.values()) {
      if (this.operator[value] === undefined) {
        throw new Error(`It seems that ${value}() is not defined in the operator object. Define it and try again.`);
      }
    }

  }

  private parse(): void {
    this.token = this.lex();
    while (this.token !== DONE) {
      this.expr();
    }
  }

  private lex(): number | string {
    const isalpha = (c: string): boolean => ((('a' <= c) && (c <= 'z')) || (('A' <= c) && (c <= 'Z')));
    const isdigit = (c: string): boolean => ((('0' <= c) && (c <= '9')) || (c === '.'));
    const isalnum = (c: string): boolean => (isdigit(c) || isalpha(c));

    let c: string = "";
    while (true) {
      if (this.end <= this.current) {
        return DONE;
      }

      c = this.expression.charAt(this.current++);

      if (' ' === c) {
        continue;
      } else if (isalnum(c)) {
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
        const optype = this.OPERATOR_TYPE.get(token);
        if (!isnum && (optype === undefined)) {
          throw new Error(`Operator "${token}" is not supported.
                           Operators curretly supported are "${this.OPERATOR_VALUE.values()}".`);
        }

        this.value = token;
        return isnum ? OpType.Number : optype;
      } else {
        this.value = c;
        return c;
      }
    }
  }

  private match(token: number | string): void {
    if (this.token === token) {
      this.token = this.lex();
    } else {
      throw new Error(`match() tried to process a token "${token}". This seems to be a bug.`);
    }
  }

  private emit(token: number, value: OpValue): void {
    this.code.push({op: token, val: value});
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
          this.emit(OpType.Primitive, this.OPERATOR_VALUE.get(value));
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
          this.emit(OpType.Primitive, this.OPERATOR_VALUE.get(value));
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
        case OpType.Binary:
          const token = this.token;
          const value = this.value;
          this.match(token);
          this.factor();
          this.emit(OpType.Binary, this.OPERATOR_VALUE.get(value));
          continue;
        default:
          return;
      }
    }
  }

  private factor(): void {
    switch (this.token) {
      case OpType.Unary:
        const token = this.token;
        const value = this.value;
        this.match(token);
        this.factor();
        this.emit(OpType.Unary, this.OPERATOR_VALUE.get(value));
        break;
      case '(':
        this.match('(');
        this.expr();
        this.match(')');
        break;
      case OpType.Number:
        this.emit(OpType.Number, this.value);
        this.match(OpType.Number);
        break;
      default:
        throw new Error(`Operator "${this.token}" is not supported.`);
        break;
    }
  }
}
