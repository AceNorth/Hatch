import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

/* --------------    ACTION CONSTANTS    ---------------- */

const FETCH_FRIENDS = 'FETCH_FRIENDS';

/* --------------    ACTION CREATORS    ----------------- */

export const fetchFriends = () =>
  (dispatch) => {
    const infoRequest = new GraphRequest(
      '/me/friends',
      null,
      (err, result) => {
        if (err) {
          console.error('problem getting friends', err);
        } else {
          const friends = result.data;
          console.log('your friends on this app', friends);
          dispatch({ type: FETCH_FRIENDS, friends });
        }
      }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };


/* ------------------    REDUCER    --------------------- */

export default (state = [], action) => {
  let newState;
  switch (action.type) {
    case FETCH_FRIENDS:
      newState = action.friends;
      break;
    default:
      return state;
  }
  return newState;
};
