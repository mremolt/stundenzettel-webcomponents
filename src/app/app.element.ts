import './elements/header.element';

import { CSSResult, LitElement, css, customElement, html } from 'lit-element';
import { Router } from '@vaadin/router';
import { TemplateResult } from 'lit-html';

import { APP_ROUTES } from './app.routes';
import { REDUX_STORE } from './tokens';
import { RootState } from './store/root.reducer';
import { connect } from './store/store';
import { container } from './ioc/container';
import { increment } from './store/counter/counter.actions';
import { selectValue } from './store/counter/counter.selectors';
import { withTranslations } from './services/translation.mixin';

@customElement('sz-app')
export class AppElement extends withTranslations(connect(LitElement)) {
  public static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }

      #outlet {
        margin: 0px 10px 0px 10px;
      }
    `;
  }

  private router: Router;

  private readonly store = container.inject(REDUX_STORE);

  private counter = 0;

  get outlet(): HTMLDivElement {
    return this.shadowRoot.getElementById('outlet') as HTMLDivElement;
  }

  public render(): TemplateResult {
    return html`
      <sz-header></sz-header>

      <div>Counter: ${this.counter}</div>

      <div id="outlet"></div>
    `;
  }

  public connectedCallback(): void {
    super.connectedCallback();

    // setInterval(this.triggerIncrement.bind(this), 1500);
  }

  public firstUpdated(): void {
    this.router = new Router(this.outlet);
    this.setupRoutes();
  }

  public stateChanged(state: RootState): void {
    this.counter = selectValue(state);
  }

  public triggerIncrement(): void {
    this.store.dispatch(increment());
  }

  private setupRoutes(): void {
    this.router.setRoutes(APP_ROUTES);
  }
}
