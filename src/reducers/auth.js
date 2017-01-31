import firebase from 'firebase';

// const provider = new firebase.auth.FacebookAuthProvider();
// // Scopes: things we want permissions to access
// provider.addScope('user_friends');
// provider.addScope('email');

/* --------------    ACTION CONSTANTS    ---------------- */
const WHOAMI = 'WHOAMI';

// /* --------------    ACTION CREATORS    ----------------- */
// export const whoami = user =>
//   (dispatch) => {
//     if (user) {
//       firebase.database().ref(`users/${user.uid}`)
//         .on('value', snapshot =>
//           dispatch({
//             type: WHOAMI,
//             user: { ...user, ...snapshot.val() }
//           })
//         );
//     } else {
//       dispatch({ type: WHOAMI, user });
//     }
//   };

// export const redirectToFacebook = () => {
//   dispatch =>
//     LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
//       .then((loginResult) => {
//         if (loginResult.isCancelled) {
//           console.log('user cancelled');
//           return;
//         }
//         AccessToken.getCurrentAccessToken()
//         .then((accessTokenData) => {
//           const credential = provider.credential(accessTokenData.accessToken);
//           return auth.signInWithCredential(credential);
//         })
//         .then(credData => {
//           console.log('cred data', credData);
//         })
//         .catch(err => {
//           console.log('uh oh err', err);
//         });
//       });
// };

// export const redirectToFacebook = () =>
//   dispatch =>
//     // Redirects to the Facebook sign-in page
//     firebase.auth().signInWithRedirect(provider)
//       .then(() => dispatch(facebookLoginSuccess()))
//       .catch(err => console.error('uh oh couldnt log in', err));

const facebookLoginSuccess = () =>
  // Retrieve the Facebook provider's OAuth token
  firebase.auth().getRedirectResult().then((result) => {
    if (result.credential) {
      // This is the Facebook Access Token we can use to access the Facebook API
      const token = result.credential.accessToken;
      console.log('HEY WE GOT A TOKEN! IT IS', token);
    }
    // Signed in user's info
    const user = result.user;
    console.log('here is the user info!!', user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });

const addUserToDb = userInfo =>
  (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`users/${currentUser.uid}`)
      .set(userInfo)
      .then(() => {
        browserHistory.push('/add');
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(err => dispatch({ type: SIGNUP_FAIL, payload: err.message }));
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
