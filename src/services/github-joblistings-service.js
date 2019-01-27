import { get } from 'lodash';
import { request } from '../util/api-util';
import { cleanQueryParam } from '../util/functional-util';

export const fetchJobListings = async payload => {
  // provide fallback query params
  const programmingLanguage = get(payload, 'programmingLanguage', 'javascript');
  const location = get(payload, 'location', 'california');
  // trim possible white space and replace space between with + signs
  const cleanLocation = cleanQueryParam(location);
  try {
    const jobListings = await request(
      'get',
      'https://jobs.github.com/positions.json',
      `?description=${programmingLanguage}&location=${cleanLocation}`
    );
    return jobListings;
  } catch (error) {
    throw error;
  }
};
