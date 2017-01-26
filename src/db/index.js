'use strict';

const User = require('./user');
const Message = require('./message');


Message.belongsTo(User, { as: 'sender'})
Message.belongsTo(User, { as: 'receiver'})


module.exports = {
    User, Message
};
