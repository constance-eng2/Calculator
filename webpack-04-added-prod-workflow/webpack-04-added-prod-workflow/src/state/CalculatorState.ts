import { Operation } from '../models/Operation';

export class CalculatorState {
  private static instance: CalculatorState;
  private currentValue = '';
  private operand = '';
  private operator: Operation = Operation.None;
  private result = '';

  private constructor() {}

  static getInstance() {
    if (!CalculatorState.instance) {
      CalculatorState.instance = new CalculatorState();
    }
    return CalculatorState.instance;
  }

  inputDigit(digit: string) {
    if (this.result) {
      this.clear();
    }
    this.currentValue += digit;
  }

  inputDot() {
    if (!this.currentValue.includes('.')) {
      if (this.currentValue === '') this.currentValue = '0';
      this.currentValue += '.';
    }
  }

  inputOperator(op: Operation) {
    if (this.currentValue === '' && this.result) {
      this.operand = this.result;
      this.result = '';
    } else if (this.currentValue !== '') {
      if (this.operand !== '' && this.operator !== Operation.None) {
        this.compute();
      } else {
        this.operand = this.currentValue;
      }
      this.currentValue = '';
    }
    this.operator = op;
  }

  compute() {
    if (this.operand === '' || this.currentValue === '' || this.operator === Operation.None) return;
    const a = parseFloat(this.operand);
    const b = parseFloat(this.currentValue);
    let res: number;
    switch (this.operator) {
      case Operation.Add: res = a + b; break;
      case Operation.Subtract: res = a - b; break;
      case Operation.Multiply: res = a * b; break;
      case Operation.Divide: res = b !== 0 ? a / b : NaN; break;
      default: res = NaN;
    }
    this.result = isNaN(res) ? 'Error' : res.toString();
    this.operand = '';
    this.currentValue = '';
    this.operator = Operation.None;
  }

  clear() {
    this.currentValue = '';
    this.operand = '';
    this.operator = Operation.None;
    this.result = '';
  }

  getDisplayValue() {
    if (this.result) return this.result;
    if (this.currentValue !== '') return this.currentValue;
    if (this.operand !== '') return this.operand;
    return '0';
  }
}