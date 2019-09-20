import { CSSResult, LitElement, TemplateResult, css, customElement, html, property } from 'lit-element';

@customElement('sz-button')
export class ButtonElement extends LitElement {
  public static get styles(): CSSResult {
    return css`
      button {
        background-color: var(--theme-active-background-color);
        color: var(--theme-active-color);
        padding: 14px 25px;
        margin-bottom: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
      }

      button:hover,
      button:active {
        background-color: red;
      }

      button[disabled] {
        background-color: #666;
      }
    `;
  }

  @property({ type: Boolean }) disabled = false;

  public render(): TemplateResult {
    return html`
      <button ?disabled="${this.disabled}"><slot></slot></button>
    `;
  }
}
