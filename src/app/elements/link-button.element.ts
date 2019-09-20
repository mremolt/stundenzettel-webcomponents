import { CSSResult, LitElement, TemplateResult, css, customElement, html, property } from 'lit-element';

@customElement('sz-link-button')
export class LinkButtonElement extends LitElement {
  @property({ type: String }) href = '#';

  public static get styles(): CSSResult {
    return css`
      a:link,
      a:visited {
        background-color: var(--theme-active-background-color);
        color: var(--theme-active-color);
        padding: 14px 25px;
        margin-bottom: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
      }

      a:hover,
      a:active {
        background-color: red;
      }
    `;
  }

  public render(): TemplateResult {
    return html`
      <a href="${this.href}"><slot></slot></a>
    `;
  }
}
