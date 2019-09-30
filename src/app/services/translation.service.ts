import { IntlMessageFormat, PrimitiveType } from 'intl-messageformat';
import memoizeIntlConstructor from 'intl-format-cache';

export const LOCALE_CHANGED_EVENT = 'LOCALE_CHANGED_EVENT';

export class TranslationService {
  public readonly localeChanged: EventTarget;

  private readonly formatters: any;

  private messages: { [key: string]: { [key: string]: string } } = {};

  private cache: { [key: string]: IntlMessageFormat } = {};

  constructor(private locale: string = 'de') {
    this.localeChanged = new EventTarget();

    this.formatters = {
      getNumberFormat: memoizeIntlConstructor(Intl.NumberFormat),
      getDateTimeFormat: memoizeIntlConstructor(Intl.DateTimeFormat),
      getPluralRules: memoizeIntlConstructor(Intl.PluralRules),
    };
  }

  public t(key: string, context: Record<string, PrimitiveType> = {}): string {
    return this.getFormatter(key).format(context) || key;
  }

  public addTranslations(locale: string, messages: { [key: string]: string }): void {
    if (!this.messages[locale]) {
      this.messages[locale] = {};
    }
    this.messages[locale] = { ...this.messages[locale], ...messages };
  }

  public setLocale(locale: string): void {
    this.locale = locale;
    this.cache = {};
    this.localeChanged.dispatchEvent(new CustomEvent(LOCALE_CHANGED_EVENT, { detail: { locale } }));
  }

  private getFormatter(key: string): IntlMessageFormat {
    if (!this.cache[key]) {
      const message = this.messages[this.locale][key];
      this.cache[key] = new IntlMessageFormat(message, this.locale, undefined, {
        formatters: this.formatters,
      });
    }
    return this.cache[key];
  }
}
