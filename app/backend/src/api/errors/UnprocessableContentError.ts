export default class UnprocessableContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnprocessableContentError';
    this.stack = '422';
  }
}
