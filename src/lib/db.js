import { openDB } from 'idb';

const DB_NAME = 'WebMorphSettings';
const STORE_NAME = 'settings';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME);
  },
});

export const settingsStore = {
  async get(key) {
    return (await dbPromise).get(STORE_NAME, key);
  },
  async set(key, val) {
    return (await dbPromise).put(STORE_NAME, val, key);
  },
  async del(key) {
    return (await dbPromise).delete(STORE_NAME, key);
  },
};
