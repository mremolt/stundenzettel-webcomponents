import { LitElement, TemplateResult, customElement, html } from 'lit-element';

@customElement('sz-home-view')
export class HomeViewElement extends LitElement {
  public render(): TemplateResult {
    return html`
      <h1>Home</h1>
    `;
  }
}
