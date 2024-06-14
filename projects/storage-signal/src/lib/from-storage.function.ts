import { effect, inject, signal, untracked, type WritableSignal } from '@angular/core';

import { StorageService } from './storage.service';

export const fromStorage = <TValue>(storageKey: string): WritableSignal<TValue | null> => {
  const storage = inject(StorageService);

  const initialValue = storage.getItem<TValue>(storageKey);

  const fromStorageSignal = signal<TValue | null>(initialValue);

  const writeToStorageOnUpdateEffect = effect(() => {
    const updated = fromStorageSignal();
    untracked(() => storage.setItem(storageKey, updated));
  });

  const updateSignalOnSignalWriteEffect = effect((onCleanup) => {
    window.onstorage = (event: StorageEvent) => {
      const isWatchedValueTargeted = event.key === storageKey;
      if (!isWatchedValueTargeted) {
        return;
      }

      const currentValue = fromStorageSignal();
      const newValue = storage.getItem<TValue>(storageKey);

      const hasValueChanged = newValue !== currentValue;
      if (hasValueChanged) {
        fromStorageSignal.set(newValue);
      }
    }

    onCleanup(() => window.onstorage = null);
  });

  return fromStorageSignal;
}
