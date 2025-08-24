// Centralized localStorage helpers with safe fallbacks
const memoryStore = new Map();

const hasWindow = typeof window !== "undefined" && !!window.localStorage;

export const KEYS = {
  CART: "cart",
  FAVS: "favs",
};

function _getRaw(key) {
  if (hasWindow) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      console.warn("localStorage.getItem failed");
      return null;
    }
  }
  return memoryStore.has(key) ? memoryStore.get(key) : null;
}

function _setRaw(key, value) {
  if (hasWindow) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      console.warn("localStorage.setItem failed");
      return false;
    }
  }
  try {
    memoryStore.set(key, value);
    return true;
  } catch {
    return false;
  }
}

export function loadJSON(key, fallback = null) {
  const raw = _getRaw(key);
  if (raw === null || raw === undefined) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed === null ? fallback : parsed;
  } catch (e) {
    console.warn("loadJSON parse failed for", key, e);
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    const str = JSON.stringify(value);
    return _setRaw(key, str);
  } catch (e) {
    console.warn("saveJSON stringify failed for", key, e);
    return false;
  }
}

export function remove(key) {
  if (hasWindow) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn("localStorage.removeItem failed");
      return false;
    }
  }
  try {
    memoryStore.delete(key);
    return true;
  } catch {
    return false;
  }
}

// Convenience typed helpers
export function getCart() {
  const v = loadJSON(KEYS.CART, []);
  return Array.isArray(v) ? v : [];
}

export function setCart(cartArray) {
  return saveJSON(KEYS.CART, cartArray);
}

export function getFavs() {
  const v = loadJSON(KEYS.FAVS, []);
  return Array.isArray(v) ? v : [];
}

export function setFavs(favsArray) {
  return saveJSON(KEYS.FAVS, favsArray);
}

export default {
  loadJSON,
  saveJSON,
  remove,
  getCart,
  setCart,
  getFavs,
  setFavs,
};
