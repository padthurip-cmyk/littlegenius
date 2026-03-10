// Storage polyfill — replaces Claude's window.storage with localStorage
if (!window.storage) {
  window.storage = {
    async get(key) {
      const val = localStorage.getItem('lg_' + key);
      if (val !== null) return { key, value: val };
      throw new Error('Key not found');
    },
    async set(key, value) {
      localStorage.setItem('lg_' + key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem('lg_' + key);
      return { key, deleted: true };
    },
    async list(prefix = '') {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith('lg_' + prefix)) keys.push(k.replace('lg_', ''));
      }
      return { keys };
    }
  };
}
