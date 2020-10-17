type OperatorObject<Dictionary, Key extends keyof Dictionary = keyof Dictionary> = {
  name: Key,
  args: Dictionary[Key]
};

type OperatorMap<Dictionary> = {
  [Key in keyof Dictionary]: OperatorObject<Dictionary, Key>
};

type ValueType<Dictionary> = Dictionary[keyof Dictionary];

type OperatorType<Dictionary> = ValueType<OperatorMap<Dictionary>>;

export type Operator<NumberType> = OperatorType<OperatorSignature<NumberType>>;

export type OperatorSignature<NumberType> = {
  num:          { x: number | string },
  log:          { x: NumberType },
  ln:           { x: NumberType },
  squareRoot:   { x: NumberType },
  sqrt:         { x: NumberType },
  negated:      { x: NumberType },
  neg:          { x: NumberType },
  plus:         { x: NumberType, y: NumberType },
  minus:        { x: NumberType, y: NumberType },
  times:        { x: NumberType, y: NumberType },
  dividedBy:    { x: NumberType, y: NumberType },
  modulo:       { x: NumberType, y: NumberType },
  toPower:      { x: NumberType, y: NumberType },
  pow:          { x: NumberType, y: NumberType },
  '+':          { x: NumberType, y: NumberType },
  '-':          { x: NumberType, y: NumberType },
  '*':          { x: NumberType, y: NumberType },
  '/':          { x: NumberType, y: NumberType },
  '%':          { x: NumberType, y: NumberType },
  '^':          { x: NumberType, y: NumberType }
};

export type OperatorArity<NumberType> = {
  [key in keyof OperatorSignature<NumberType>]: Arity
};

export type Arity = 'number' | 'unary' | 'binary' | 'none';

export type Code<NumberType> = {
  arity: Arity;
  value: string | keyof OperatorSignature<NumberType>
};

export const createOperator = <Dictionary, Key extends keyof Dictionary = keyof Dictionary>
(name: Key, args: Dictionary[Key]): OperatorType<Dictionary> => {
  return {
    name,
    args
  };
};

export const match = <Dictionary, Return>
(operator: OperatorType<Dictionary>, map: { [Key in keyof Dictionary]: ((args: Dictionary[Key]) => Return) }): Return => {
  return map[operator.name](operator.args);
};
