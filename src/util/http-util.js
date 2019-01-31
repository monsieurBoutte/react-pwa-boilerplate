export const toQueryParams = args => {
  const params = [];

  Object.keys(args).forEach(key => {
    const value = args[key];

    if (typeof value === 'undefined' || value === null) return;

    if (value && typeof value === 'object') {
      Object.keys(value).forEach(subkey => {
        params.push(`${key}[]=${encodeURIComponent(args[key][subkey])}`);
      });
    } else {
      params.push(`${key}=${encodeURIComponent(args[key])}`);
    }
  });

  return params.join('&');
};
