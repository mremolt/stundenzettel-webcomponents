import { PrimitiveType } from 'intl-messageformat';
import { TRANSLATION_SERVICE } from '../tokens';
import { container } from '../ioc/container';

export function t(key: string, context: Record<string, PrimitiveType> = {}): string {
  const service = container.inject(TRANSLATION_SERVICE);
  return service.t(key, context);
}
