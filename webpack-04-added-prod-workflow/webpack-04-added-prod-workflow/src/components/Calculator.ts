import { Button } from "./Button";
import { Display } from "./Display";

// Main Calculator logic
export class Calculator {
  private currentInput: string = "";
  private previousInput: string = "";
  private operation: string | null = null;
  private resultDisplayed: boolean = false;
  private display: Display;

  constructor() {
    this.createCalculatorUI();
    this.display = new Display("#display");
    this.attachEvents();
  }

  private createCalculatorUI() {
    document.body.innerHTML = `
      <div class="calculator">
        <div class="calculator-display" id="display">0</div>
        <div class="calculator-buttons">
          <button class="btn function" data-action="clear">C</button>
          <button class="btn function" data-action="delete">⌫</button>
          <button class="btn function" data-action="percent">%</button>
          <button class="btn operator" data-action="divide">÷</button>
          <button class="btn number" data-number="7">7</button>
          <button class="btn number" data-number="8">8</button>
          <button class="btn number" data-number="9">9</button>
          <button class="btn operator" data-action="multiply">×</button>
          <button class="btn number" data-number="4">4</button>
          <button class="btn number" data-number="5">5</button>
          <button class="btn number" data-number="6">6</button>
          <button class="btn operator" data-action="subtract">-</button>
          <button class="btn number" data-number="1">1</button>
          <button class="btn number" data-number="2">2</button>
          <button class="btn number" data-number="3">3</button>
          <button class="btn operator" data-action="add">+</button>
          <button class="btn function" data-action="negate">±</button>
          <button class="btn number" data-number="0">0</button>
          <button class="btn number" data-number=".">.</button>
          <button class="btn operator" data-action="equals">=</button>
          <button class="btn operator" data-action="power">^</button>
        </div>
      </div>
    `;
  }

  private attachEvents() {
    // Numbers
    document.querySelectorAll('.btn.number').forEach(btn => {
      new Button(btn as HTMLButtonElement, (value) => {
        this.appendNumber(value);
        this.updateDisplay();
      });
    });

    // Operators
    document.querySelectorAll('.btn.operator').forEach(btn => {
      new Button(btn as HTMLButtonElement, (action) => {
        switch (action) {
          case "add": this.chooseOperation("+"); break;
          case "subtract": this.chooseOperation("-"); break;
          case "multiply": this.chooseOperation("×"); break;
          case "divide": this.chooseOperation("÷"); break;
          case "percent": this.chooseOperation("%"); break;
          case "power": this.chooseOperation("^"); break;
          case "equals": this.compute(); break;
        }
        this.updateDisplay();
      });
    });

    // Functions
    document.querySelector('[data-action="clear"]')?.addEventListener('click', () => {
      this.clear();
      this.updateDisplay();
    });
    document.querySelector('[data-action="delete"]')?.addEventListener('click', () => {
      this.delete();
      this.updateDisplay();
    });
    document.querySelector('[data-action="percent"]')?.addEventListener('click', () => {
      this.chooseOperation("%");
      this.updateDisplay();
    });
    document.querySelector('[data-action="negate"]')?.addEventListener('click', () => {
      let cur = this.getCurrentInput();
      if (cur === "" || cur === "0") return;
      if (cur.startsWith("-")) {
        this.currentInput = cur.slice(1);
      } else {
        this.currentInput = "-" + cur;
      }
      this.updateDisplay();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!isNaN(Number(e.key))) {
        this.appendNumber(e.key);
      } else if (e.key === '.') {
        this.appendNumber('.');
      } else if (e.key === '+') {
        this.chooseOperation('+');
      } else if (e.key === '-') {
        this.chooseOperation('-');
      } else if (e.key === '*') {
        this.chooseOperation('×');
      } else if (e.key === '/') {
        this.chooseOperation('÷');
      } else if (e.key === '%') {
        this.chooseOperation('%');
      } else if (e.key === '^') {
        this.chooseOperation('^');
      } else if (e.key === 'Enter' || e.key === '=') {
        this.compute();
      } else if (e.key === 'Backspace') {
        this.delete();
      } else if (e.key.toLowerCase() === 'c') {
        this.clear();
      }
      this.updateDisplay();
    });
  }

  // Logic functions
  private appendNumber(num: string) {
    if (this.resultDisplayed) {
      this.currentInput = "";
      this.resultDisplayed = false;
    }
    if (num === "." && this.currentInput.includes(".")) return;
    this.currentInput += num;
  }

  private chooseOperation(op: string) {
    if (this.currentInput === "" && op === "-") {
      this.currentInput = "-";
      return;
    }
    if (this.currentInput === "") return;
    if (this.previousInput !== "") {
      this.compute();
    }
    this.operation = op;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  private clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = null;
  }

  private delete() {
    this.currentInput = this.currentInput.slice(0, -1);
  }

  private compute() {
    let computation: number;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+": computation = prev + current; break;
      case "-": computation = prev - current; break;
      case "×": computation = prev * current; break;
      case "÷": computation = prev / current; break;
      case "%": computation = prev % current; break;
      case "^": computation = Math.pow(prev, current); break;
      default: return;
    }
    this.currentInput = computation.toString();
    this.operation = null;
    this.previousInput = "";
    this.resultDisplayed = true;
  }

  private getDisplay() {
    let display = "";
    if (this.previousInput !== "") {
      display += this.previousInput + " " + (this.operation ?? "") + " ";
    }
    display += this.currentInput;
    return display.trim() || "0";
  }

  private getCurrentInput() {
    return this.currentInput || "0";
  }

  private updateDisplay() {
    this.display.setValue(this.getDisplay());
  }
}