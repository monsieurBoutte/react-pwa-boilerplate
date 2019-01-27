import { effect } from 'easy-peasy';
import { fetchJobListings } from '../services/github-joblistings-service';
import { checkLocalStorage } from '../util/localstorage-util';

// rehydrate the job listings collection and current selection
// state from localStorage if it exist
const initialState = {
  jobListingsCollection: [],
  jobListingsLoading: false,
  currentJobSelection: checkLocalStorage('currentJobSelection', {})
};

export const githubJobListingsModel = {
  githubJoblistings: {
    ...initialState,
    getJobListings: effect(async (dispatch, payload, getState) => {
      dispatch.githubJoblistings.updateJobListingsLoading(true);
      try {
        const fetchedJobListings = await fetchJobListings(payload);
        dispatch.githubJoblistings.updateJoblistingsCollection(
          fetchedJobListings
        );
      } catch (error) {
        console.error(
          new Date(),
          'error caught when fetching job listings',
          error
        );
      }
    }),
    updateJoblistingsCollection: (state, payload) => {
      /**
       *  https://github.com/ctrlplusb/easy-peasy#installation
       *  🙌 thanks to immer
       *  ..Mutate the state directly. Under the hood we convert this to an
       *  an immutable update in the store, but at least you don't need to
       *  worry about being careful to return new instances etc. This also
       *  makes it 👇 easy to update deeply nested items.
       */
      state.jobListingsCollection = payload;
    },
    updateJobListingsLoading: (state, payload) => {
      state.jobListingsLoading = payload;
    },
    updateSelectedJobListing: (state, payload) => {
      state.currentJobSelection = payload;

      // store the current job selection state offline
      localStorage.setItem('currentJobSelection', JSON.stringify(payload));
    }
  }
};
