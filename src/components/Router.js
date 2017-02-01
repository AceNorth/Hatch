import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './LandingPage';
import ViewPayload from './ViewPayload';
import Login from './Login';

// class RouterComponent extends Component {
//   state = { authorized: false }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth) {
//       this.setState({ authorized: true });
//     }
//   }

//   renderWholeApp() {
//     console.log('RENDERING WHOLE APP bc authorized is', this.state.authorized);

//     if (this.state.authorized) {
//       return (
//         <Router>
//           <Scene key="landingPage" component={LandingPage} title="Left You Somethin" />
//           <Scene key="viewPayload" component={ViewPayload} title="Check this out!" />
//         </Router>
//       );
//     }
//     return (
//       <Router>
//         <Scene key="login" component={Login} hideNavBar />
//         <Scene key="landingPage" component={LandingPage} title="Left You Somethin" />
//         <Scene key="viewPayload" component={ViewPayload} title="Check this out!" />
//       </Router>
//     );
//   }

//   render() {
//     return this.renderWholeApp();
//   }
// }

const RouterComponent = () => (
  <Router>
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="landingPage" component={LandingPage} title="Left You Somethin" />
    <Scene key="viewPayload" component={ViewPayload} title="Check this out!" />
  </Router>
);

export default RouterComponent;

// const mapStateToProps = ({ auth }) => ({ auth });

// RouterComponent.propTypes = {
//   auth: PropTypes.object,
// };

// export default connect(mapStateToProps)(RouterComponent);
