import { LitElement } from 'lit-element';
import { Store, Unsubscribe } from 'redux';

export const connectFactory = <S>(store: Store<S>) => <T extends Constructor<LitElement>>(BaseElement: T) =>
  class extends BaseElement {
    private storeUnsubscribe!: Unsubscribe;

    public connectedCallback(): void {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.storeUnsubscribe = store.subscribe(() => {
        this.stateChanged(store.getState());
        this.requestUpdate();
      });
      this.stateChanged(store.getState());
    }

    public disconnectedCallback(): void {
      this.storeUnsubscribe();

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }

    /**
     * The `stateChanged(state)` method will be called when the state is updated.
     */
    // eslint-disable-next-line
    protected stateChanged(_state: S): void {}
  };
