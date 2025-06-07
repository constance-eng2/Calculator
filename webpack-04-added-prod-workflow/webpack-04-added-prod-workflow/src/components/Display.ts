export class Display {
  private displayElement: HTMLElement;

  constructor(selector: string) {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) throw new Error('Display element not found');
    this.displayElement = el;
  }

  setValue(value: string) {
    this.displayElement.textContent = value;
  }
}