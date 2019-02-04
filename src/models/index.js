import { settingsModel } from './settings-model';
import { musicModel } from './music-model';
// import { authModel } from './auth-model';

export const model = {
  ...settingsModel,
  ...musicModel
};
