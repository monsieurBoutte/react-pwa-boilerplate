/**
 * check if value exist in localStorage, otherwise return default
 * @param {string} key name of value to check for in local storage
 * @param {*} defaultValue if value not found, fallback to this value
 */
export const checkLocalStorage = (key, defaultValue) =>
  localStorage.getItem(`${key}`)
    ? JSON.parse(localStorage.getItem(`${key}`))
    : defaultValue;

/**
 * store the value within local storage
 * @param {string} key name of value to set in localStorage
 * @param {*} payload value to set for key in localStorage
 */
export const setInLocalStorage = (key, payload) =>
  localStorage.setItem(`${key}`, JSON.stringify(payload));
