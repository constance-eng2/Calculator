export class Button {
  constructor(
    private element: HTMLButtonElement,
    private onClick: (value: string) => void
  ) {
    element.addEventListener('click', () => {
      const value = this.element.getAttribute('data-action') ?? this.element.getAttribute('data-number');
      if (value !== null) {
        this.onClick(value);
      }
    });
  }
}