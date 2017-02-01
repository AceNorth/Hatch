import axios from 'axios';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

import { tunnelIP } from '../TUNNELIP';

const provider = firebase.auth.FacebookAuthProvider;

/* --------------    ACTION CONSTANTS    ---------------- */

const WHOAMI = 'WHOAMI';

/* --------------    ACTION CREATORS    ----------------- */

export const whoami = ({ uid, email, displayName, photoURL, refreshToken }) =>
  ({ type: WHOAMI, user: { id: uid, email, displayName, photoURL, refreshToken } });

/* ------------------    REDUCER    --------------------- */

export default (state = null, action) => {
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

export const redirectToFacebook = () =>
  dispatch =>
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
      .then((loginResult) => {
        if (loginResult.isCancelled) { // User cancels login
          return;
        }
        AccessToken.getCurrentAccessToken()
        .then((accessTokenData) => {
          const credential = provider.credential(accessTokenData.accessToken);
          return firebase.auth().signInWithCredential(credential);
        })
        .then(({ uid, email, displayName, photoURL, refreshToken }) => {
          addUserToDb({ uid, displayName, email });
          dispatch(whoami({ uid, email, displayName, photoURL, refreshToken }));
          Actions.landingPage();
        })
        .catch(err => console.log('uh oh err', err));
      });

/* ------------------    HELPERS    --------------------- */

const addUserToDb = ({ uid, displayName, email }) =>
  axios.post(`${tunnelIP}/api/user`, { uid, displayName, email })
    .catch(err => console.error('ruh roh auth reducer', err));
