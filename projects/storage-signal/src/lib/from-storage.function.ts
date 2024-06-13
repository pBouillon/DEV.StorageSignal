import { effect, inject, signal, untracked, type WritableSignal } from '@angular/core';

import { StorageService } from './storage.service';

export const fromStorage = <TValue>(key: string): WritableSignal<TValue | null> => {
  const storage = inject(StorageService);

  const initialValue = storage.getItem<TValue>(key);

  const fromStorageSignal = signal<TValue | null>(initialValue);

  const writeToStorageOnUpdateEffect = effect(() => {
    const updated = fromStorageSignal();
    untracked(() => storage.setItem(key, updated));
  });

  const updateSignalOnSignalWriteEffect = effect((onCleanup) => {
    const intervalId = setInterval(() => {
      const newValue = storage.getItem<TValue>(key);
      const currentValue = fromStorageSignal();

      const hasValueChanged = newValue !== currentValue;
      if (hasValueChanged) fromStorageSignal.set(newValue);
    }, 50)

    onCleanup(() => clearInterval(intervalId));
  });

  return fromStorageSignal;
}
