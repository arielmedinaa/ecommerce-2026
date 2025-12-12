class StorageService {
  constructor(storage) {
    this.storage = storage;
  }

  setItem(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      this.storage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`Error saving to storage:`, error);
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting from storage:`, error);
      return defaultValue;
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

const localStorageService = new StorageService(localStorage);
const sessionStorageService = new StorageService(sessionStorage);

export { localStorageService, sessionStorageService };
