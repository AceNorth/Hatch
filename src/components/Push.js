// import React from 'react';
// import SocketIOClient from 'socket.io-client';

// class Push extends React.Component {
//   constructor(props) {
//     super(props);
  
//     // Creating the socket-client instance will automatically connect to the server.
//     this.socket = SocketIOClient('http://localhost:3331');
//   }

//   socket.on('egg', (egg) => {
//     var oldEggs = this.state.eggs;
//     // React will automatically rerender the component when a new egg is added.
//     this.setState({ eggs: oldEggs.concat(egg) });
//   });
// }

// module.exports = Push;