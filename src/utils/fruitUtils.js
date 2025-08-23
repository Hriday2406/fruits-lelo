import { FRUITS } from "./constants";

// Create lookup maps for better performance and resilience
export const FRUITS_BY_SLUG = Object.fromEntries(
  FRUITS.map((fruit) => [fruit.slug, fruit]),
);

export const FRUITS_BY_ID = Object.fromEntries(
  FRUITS.map((fruit) => [fruit.id, fruit]),
);

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
 * @param {Array} cart - The cart array containing fruit items
 * @param {number} fruitId - The ID of the fruit to check
 * @returns {boolean} True if the fruit is in the cart, false otherwise
 */
export function isInCart(cart, fruitId) {
  return cart.some((item) => item.fruitId === fruitId);
}
