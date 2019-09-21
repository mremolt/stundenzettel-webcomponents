import { CSSResult, LitElement, TemplateResult, css, customElement, html } from 'lit-element';
import { TRANSLATION_SERVICE } from '../tokens';
import { container } from '../ioc/container';

@customElement('sz-header')
export class HeaderElement extends LitElement {
  private readonly translationService = container.inject(TRANSLATION_SERVICE);

  public static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        margin-bottom: 10px;
      }

      ul {
        list-style-type: none;
        border: 1px solid #e7e7e7;
        background-color: var(--theme-card-background-color);
        display: flex;
        margin: 0;
        padding: 0;
      }

      li {
        display: flex;
      }

      a {
        display: block;
        padding: 15px;
        text-decoration: none;
        color: inherit;
      }

      a:hover,
      a.active {
        color: var(--theme-active-color);
        background-color: var(--theme-active-background-color);
      }

      .title {
        padding: 15px;
        font-weight: bold;
        font-size: 1.2em;
      }
    `;
  }

  public render(): TemplateResult {
    return html`
      <nav>
        <ul>
          <li class="title">Stundenzettel</li>
          <li><a href="/">Home</a></li>
          <li><a href="/month">Month overview</a></li>
          <li><a href="/day">Daily view</a></li>
          <li><a @click="${() => this.setLocale('de')}">DE</a></li>
          <li><a @click="${() => this.setLocale('en')}">EN</a></li>
        </ul>
      </nav>
    `;
  }

  private setLocale(locale: string): void {
    this.translationService.setLocale(locale);
  }
}
