import { EnvironmentProviders, Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('Web Storage Injection Token')

@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly #storage = inject(STORAGE);

  getItem<T>(key: string): T | null {
    const raw = this.#storage.getItem(key);

    return raw === null
      ? null
      : JSON.parse(raw) as T;
  }

  setItem<T>(key: string, value: T | null): void {
    const stringified = JSON.stringify(value);
    this.#storage.setItem(key, stringified);
  }
}

export const provideStorage = (storage: Storage): EnvironmentProviders => makeEnvironmentProviders([
  { provide: STORAGE, useValue: storage },
]);
