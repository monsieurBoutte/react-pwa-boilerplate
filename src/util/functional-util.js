export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

export const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

export const trimStr = str => str.trim();
export const replaceSpace = str => str.replace(/ /g, '+');
export const cleanQueryParam = pipe(
  trimStr,
  replaceSpace
);
