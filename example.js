// Run 'node example.js' after 'node run test'

const Calculator = require('./src/calculator').Calculator;
const DecimalOperator = require('./src/decimaloperator').DecimalOperator;

const c = new Calculator();
const dc = new Calculator(DecimalOperator);

const formulas = ['0.1 + 0.2', '0.3 - 0.1', '0.6 * 3', '0.7 ^ 2']

formulas.forEach((formula) => {
  console.log(`default: ${formula} = ${c.eval(formula)}`);
  console.log(`decimal: ${formula} = ${dc.eval(formula)}`);
  console.log();
});
