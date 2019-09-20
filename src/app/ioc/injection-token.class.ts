export class InjectionToken<T> {
  public readonly token: symbol;
  // eslint-disable-next-line
  protected _type: T;

  constructor(description: string) {
    this.token = Symbol(description);
  }
}
