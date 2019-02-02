import { githubJobListingsModel } from './github-joblistings-model';
import { settingsModel } from './settings-model';
// import { authModel } from './auth-model';

export const model = {
  ...githubJobListingsModel,
  ...settingsModel
};
