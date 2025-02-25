import { PersistentStorage } from '../types';

export class LocalStorageWrapper implements PersistentStorage<string | null> {
  private storage;

  constructor(storage: LocalStorageInterface) {
    this.storage = storage;
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string | null): void {
    if (value !== null) {
      // setting null to localstorage stores "null" as string
      return this.storage.setItem(key, value);
    } else {
      return this.removeItem(key);
    }
  }

  getSize(): number {
    return new Blob(Object.values(this.storage)).size;
  }
}

interface LocalStorageInterface {
  // Actual type definition: https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L14276
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

declare class Blob {
  // Actual type defintion: https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L2418
  constructor(data: any);
  readonly size: number;
}