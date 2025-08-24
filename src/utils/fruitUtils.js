import { FRUITS_BY_SLUG, FRUITS_BY_ID } from "./constants";

/**
 * Get fruit by slug
 * @param {string} slug - The fruit slug
 * @returns {object|null} The fruit object or null if not found
 */
export function getFruitBySlug(slug) {
  return FRUITS_BY_SLUG[slug] || null;
}

/**
 * Get fruit by ID
 * @param {number} id - The fruit ID
 * @returns {object|null} The fruit object or null if not found
 */
export function getFruitById(id) {
  return FRUITS_BY_ID[id] || null;
}

/**
 * Check if a fruit exists by slug
 * @param {string} slug - The fruit slug
 * @returns {boolean} True if fruit exists, false otherwise
 */
export function fruitExistsBySlug(slug) {
  return slug in FRUITS_BY_SLUG;
}

/**
 * Check if a fruit is in the cart
 * Strict: only accepts an array of cart items or a JSON string representing such an array.
 * Returns false for any other shapes (numbers, maps, single objects).
 * @param {Array|String|null|undefined} cart - Expected: [{ fruitId, count }, ...] or a JSON string of that array
 * @param {number|string} fruitId - The ID of the fruit to check
 * @returns {boolean} True if the fruit is in the cart, false otherwise
 */
export function isInCart(cart, fruitId) {
  if (!cart) return false;

  let items = cart;
  if (typeof cart === "string") {
    try {
      items = JSON.parse(cart);
    } catch {
      return false;
    }
  }

  if (!Array.isArray(items)) return false;

  const targetId = Number(fruitId);
  if (Number.isNaN(targetId)) return false;

  return items.some((item) => {
    if (!item || typeof item !== "object") return false;
    const id = Number(item.fruitId);
    return !Number.isNaN(id) && id === targetId;
  });
}
