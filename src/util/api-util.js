import axios from 'axios';

/**
 * axios abstraction
 * @param {string} method
 * @param {string} baseUrl
 * @param {string} route
 * @param {object} [payload]
 */
export const request = async (method, baseUrl, route, payload) => {
  try {
    const response = await axios({
      url: `${baseUrl}/${route}`,
      data: payload,
      method
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
