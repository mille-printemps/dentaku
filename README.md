# Dentaku

An arithmetic calculator application


## Requirements

- node.js
- npm


## Build

```

  %> npm install
  %> npm run test
  %> npm run webpack

```

## Run

- Go to the `app` directory.
- Open `index.html` in your web browser.


## Model

```

  <expression> ::= <expression> "+" <term> | <expression> "-" <term> | <term>
  <term> ::= <term> "*" <subterm> | <term> "/" <subterm> | <term> "%" <subterm> | <subterm>
  <subterm> ::= <subterm> <binary_operator> <factor> | <factor>
  <factor> ::= <unary_operator> <factor> | "(" <expression> ")" | <number>

  <binary_operator> ::= "^" | "pow" | "toPower"
  <unary_operator> ::= "ln" | "log" | "sqrt" | "squareRoot" | "neg" | "negated"
  <number> ::= decimal numbers

```

## Operator precedence

Operators are listed from left to right in ascending precedence.

```

"+","-"  <<  "*", "/", "%"  <<  <binary_operator>  <<  <unary_operator>  <<  "(", ")"


```