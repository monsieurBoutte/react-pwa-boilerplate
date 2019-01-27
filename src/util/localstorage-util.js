/**
 * checkLocalStorage
 * @param {string} name name of value to check for in local storage
 * @param {*} defaultValue if value not found, fallback to this value
 */
export const checkLocalStorage = (name, defaultValue) =>
  localStorage.getItem(`${name}`)
    ? JSON.parse(localStorage.getItem(`${name}`))
    : defaultValue;
