/**
 * Mock local storage object for use in testing 
 */
export class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

export function makeTestCounter(intStart)
{
    let currentNum = intStart - 1;
    return () => {currentNum++; return currentNum};
}