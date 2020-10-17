import $ from 'jquery';
import { Decimal } from 'decimal.js';
import { Calculator } from './Calculator';
import { Controller } from './Controller';
import { calculateDecimal } from './operator';

$(() => {
  const MAX_NUMBER_OF_DIGITS = 20;

  const controller = new Controller();
  const calculator = new Calculator<Decimal>(calculateDecimal);

  const display = (expression: string, formula: string) => {
    $('span.expression').empty();
    $('span.expression').append(expression);

    $('span.formula').empty();
    $('span.formula').append(formula);
  };

  let resultDisplayed = false;

  $(() => {
    $('div.sym, div.num')
      .on('mouseenter', function(): void {
        $(this).css({'border-color' : '#AAAAAA', 'box-shadow' : '2px 2px rgba(0,0,0,0,4)'});
      })
      .on('mouseleave', function(): void {
        $(this).css({'border-color' : '#DDDDDD', 'box-shadow' : '0px 0px'});
      })
      .on('mousedown', function(): void {
        const id = $(this).children('span').attr('id');
        const text = $(this).children('span').text();

        if (resultDisplayed === true && '0123456789'.indexOf(id!) !== -1) {
          controller.clear();
        }
        resultDisplayed = false;

        const processed = controller.process(id!, text);

        if (processed) {
          display(controller.expression.toString(), controller.formula.toString());
        }
      });
  });

  $(() => {
    $('div.equ')
      .on('mouseenter', function(): void {
        $(this).css({'border-color' : '#000055', 'box-shadow' : '2px 2px rgba(0,0,0,0,4)'});
      })
      .on('mouseleave', function(): void {
        $(this).css({'border-color' : '#99CCFF', 'box-shadow' : '0px 0px'});
      })
      .on('mousedown', (): void => {
        if (!controller.validate()) {
          return;
        }

        try {
          const result = calculator.eval(controller.expression.toString());

          let formula: string;
          let decimal: string;
          formula = decimal = result.toString();
          if (MAX_NUMBER_OF_DIGITS < formula.length) {
            const exponential = result.toExponential();
            if (MAX_NUMBER_OF_DIGITS < exponential.length) {
              throw Error(`cannot display in the box:\n${formula}\n${exponential}`);
            }
            formula = exponential;
          }
          display(`${controller.formula.toString()} =`, formula);

          resultDisplayed = true;
          controller.clear();

          const digits = decimal.split('');
          for (const digit of digits) {
            if (digit === '-') {
              controller.expression.push(' neg ');
            } else {
              controller.expression.push(digit);
            }
            controller.formula.push(digit);
          }
        } catch (e) {
          alert(e.message);
        }
      });
  });
});
