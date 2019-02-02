import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'easy-peasy';
import { model } from './models';

/**
 * model, is used for passing through the base model
 * the second argument takes an object for additional configuration
 */

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true })
  // initialState: {}
});

export default store;
