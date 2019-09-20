import { InjectionToken } from './injection-token.class';

export class IocContainer {
  private iocMap = new WeakMap<InjectionToken<any>, () => any>();

  private cache = new WeakMap<InjectionToken<any>, any>();

  public provide<T>(token: InjectionToken<T>, factory: () => T): void {
    this.iocMap.set(token, factory);
  }

  public inject<T>(token: InjectionToken<T>): T {
    if (!this.cache.has(token)) {
      this.cache.set(token, this.iocMap.get(token)());
    }

    return this.cache.get(token);
  }
}
