export class Position {
  static isNotIntersect(firstElement, secondElement) {
    return (
      firstElement.after(secondElement) ||
      secondElement.after(firstElement) ||
      firstElement.under(secondElement) ||
      secondElement.under(firstElement)
    );
  }

  static isIntersect(firstElement, secondElement) {
    return !Position.isNotIntersect(firstElement, secondElement);
  }

  constructor(rect, correction) {
    this.left = rect.left + correction.left;
    this.right = rect.right - correction.right;
    this.top = rect.top + correction.top;
    this.bottom = rect.bottom - correction.bottom;
  }

  after(elementPosition) {
    return this.left > elementPosition.right;
  }

  under(elementPosition) {
    return this.top > elementPosition.bottom;
  }
}
