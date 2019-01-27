import { lazy } from 'react';

// credit to 👉 https://hackernoon.com/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d
export function lazyWithPreload(factory) {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
}
