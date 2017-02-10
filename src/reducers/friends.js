import _ from 'lodash';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

/* --------------    ACTION CONSTANTS    ---------------- */

const FETCH_FRIENDS = 'FETCH_FRIENDS';
const SELECT_FRIEND = 'SELECT_FRIEND';

/* --------------    ACTION CREATORS    ----------------- */

export const selectFriend = selectedFriendId => ({ type: SELECT_FRIEND, selectedFriendId });

export const fetchFriends = user =>
  (dispatch) => {
    const infoRequest = new GraphRequest(
      '/me/friends',
      { parameters: { fields: { string: 'name,picture' } } },
      (err, result) => {
        if (err) {
          console.error('problem getting friends', err);
        } else {
          // Get logged in user's object to match format of friends
          const me = {
            name: `${user.firstName} ${user.lastName} (me)`,
            id: user.fbId,
            picture: {
              data: {
                url: user.profilePic,
              },
            }
          };
          // Add self to friends list
          result.data.push(me);

          // Sort friends by first name
          const friends = _.sortBy(result.data, ['name'])
            .map((friend) => {
              const fbIdAdded = { ...friend, fbId: friend.id }; // make fbId field
              return _.omit(fbIdAdded, 'id'); // delete old id key
            });
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
