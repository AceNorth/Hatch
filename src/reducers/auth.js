import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

const provider = firebase.auth.FacebookAuthProvider;

/* --------------    ACTION CONSTANTS    ---------------- */
const WHOAMI = 'WHOAMI';

/* --------------    ACTION CREATORS    ----------------- */
export const whoami = user => ({ type: WHOAMI, user });

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
        .then(({ email, uid, displayName, photoURL, refreshToken }) => {
          dispatch(whoami({ email, uid, displayName, photoURL, refreshToken }));
        })
        .catch(err => {
          console.log('uh oh err', err);
        });
      });

// const addUserToDb = userInfo =>
//   (dispatch) => {
//     const { currentUser } = firebase.auth();
//     // @todo:
//     // findOrCreate user in Sequelize
//   };

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
