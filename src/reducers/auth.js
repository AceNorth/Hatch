import axios from 'axios';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import { tunnelIP } from '../TUNNELIP';
import { fetchFriends } from './friends';

/* --------------    ACTION CONSTANTS    ---------------- */

const WHOAMI = 'WHOAMI';

/* --------------    ACTION CREATORS    ----------------- */

export const whoami = user => ({ type: WHOAMI, user });

/* ------------------    REDUCER    --------------------- */

export default (state = false, action) => {
  let newState;
  switch (action.type) {
    case WHOAMI:
      newState = action.user;
      break;
    default:
      return state;
  }
  return newState;
};

/* --------------    THUNKS/DISPATCHERS    -------------- */

export const fetchUserInfo = () =>
  (dispatch) => {
    const infoRequest = new GraphRequest(
      '/me',
      { parameters: { fields: { string: 'email,first_name,last_name,picture' } } },
      (err, result) => {
        if (err) {
          console.error('problem getting user info', err);
        } else {
          const { id, email, first_name, last_name, picture } = result;
          const user = {
            firstName: first_name,
            lastName: last_name,
            fbId: id,
            email,
          };
          addUserToDb(user);
          dispatch(whoami({ ...user, profilePic: picture.data.url }));
          dispatch(fetchFriends());
        }
      }
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };

/* ------------------    HELPERS    --------------------- */

const addUserToDb = user =>
  axios.post(`${tunnelIP}/api/user`, user)
    .catch(err => console.error('ruh roh auth reducer (maybe check tunnel)', err));
