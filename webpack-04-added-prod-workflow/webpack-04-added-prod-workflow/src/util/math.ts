import { Operation } from '../models/Operation';

export function calculate(a: number, b: number, op: Operation): number | string {
  switch (op) {
    case Operation.Add: return a + b;
    case Operation.Subtract: return a - b;
    case Operation.Multiply: return a * b;
    case Operation.Divide: return b !== 0 ? a / b : 'Error';
    default: return 'Error';
  }
}