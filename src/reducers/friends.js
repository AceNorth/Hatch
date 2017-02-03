import _ from 'lodash';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

/* --------------    ACTION CONSTANTS    ---------------- */

const FETCH_FRIENDS = 'FETCH_FRIENDS';
const SELECT_FRIEND = 'SELECT_FRIEND';

/* --------------    ACTION CREATORS    ----------------- */

export const selectFriend = selectedFriendId => ({ type: SELECT_FRIEND, selectedFriendId });

export const fetchFriends = () =>
  (dispatch) => {
    const infoRequest = new GraphRequest(
      '/me/friends',
      { parameters: { fields: { string: 'name,picture' } } },
      (err, result) => {
        if (err) {
          console.error('problem getting friends', err);
        } else {
          const friends = _.sortBy(result.data, ['name'])
            .map(friend => ({ ...friend, id: Number(friend.id) }));
          dispatch({ type: FETCH_FRIENDS, friends });
        }
      }
    );

    new GraphRequestManager().addRequest(infoRequest).start();
  };

/* ------------------    REDUCER    --------------------- */

const initialState = {
  allFriends: [],
  selectedFriendId: -1,
};

export default (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case FETCH_FRIENDS:
      newState.allFriends = action.friends;
      break;
    case SELECT_FRIEND:
      newState.selectedFriendId = action.selectedFriendId;
      break;
    default:
      return state;
  }
  return newState;
};
