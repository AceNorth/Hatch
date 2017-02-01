import axios from 'axios';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import tunnelIP from '../TUNNELIP';

const provider = firebase.auth.FacebookAuthProvider;

/* --------------    ACTION CONSTANTS    ---------------- */
const WHOAMI = 'WHOAMI';

/* --------------    ACTION CREATORS    ----------------- */
export const whoami = ({ id, email, displayName, photoURL, refreshToken }) =>
  ({ type: WHOAMI, user: { id, email, displayName, photoURL, refreshToken } });

export const redirectToFacebook = () =>
  dispatch =>
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then((loginResult) => {
        if (loginResult.isCancelled) {
          console.log('user canceled');
          return;
        }
        AccessToken.getCurrentAccessToken()
        .then((accessTokenData) => {
          const credential = provider.credential(accessTokenData.accessToken);
          return firebase.auth().signInWithCredential(credential);
        })
        .then(({ email, displayName, photoURL, refreshToken }) => {
          console.log('here is the stuff', email, displayName, photoURL, refreshToken);
          dispatch(addUserToDb({ displayName, email }));
          dispatch(whoami({ email, displayName, photoURL, refreshToken }));
        })
        .catch(err => {
          console.log('uh oh err', err);
        });
      });

const addUserToDb = ({ uid, displayName, email }) =>
  (dispatch) => {
    axios.post(`${tunnelIP}/api/user`, { uid, displayName, email })
      .then(res => console.log('hey res.data', res.data))
      .catch(err => console.error('ruh roh auth reducer', err));
  };

/* ------------------    REDUCER    --------------------- */
const authReducer = (state = null, action) => {
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

export default authReducer;
