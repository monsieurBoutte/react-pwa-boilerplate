import axios from 'axios';

export const login = async ({ username, password }) => {
  try {
    const authenticatedResponse = await axios({
      url: `${process.env.REACT_APP_API_URL}/authenticate`,
      method: 'post',
      data: {
        email: username,
        password
      }
    });

    return authenticatedResponse.data;
  } catch (error) {
    throw error;
  }
};
