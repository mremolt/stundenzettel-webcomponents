import { LitElement } from 'lit-element';

import { TRANSLATION_SERVICE } from '../tokens';
import { container } from '../ioc/container';

import { LOCALE_CHANGED_EVENT } from './translation.service';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function withTranslations<T extends Constructor<LitElement>>(BaseElement: T) {
  return class extends BaseElement {
    protected readonly translationService = container.inject(TRANSLATION_SERVICE);

    public connectedCallback(): void {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.translationService.localeChanged.addEventListener(LOCALE_CHANGED_EVENT, () => {
        this.requestUpdate();
      });
    }
  };
}
