const Sequelize = require('sequelize');
const db = require('./db');

const messageSchema = {
    goHereImage: {
        type: Sequelize.STRING,

    },
    goHereText: {
        type: Sequelize.STRING,

    },
    latitude: {
        type: Sequelize.DECIMAL,

    },
    longitude: {
        type: Sequelize.DECIMAL,

    },
    payload: {
        type: Sequelize.STRING,

    },
};

const messageConfig = {};

const Message = db.define('message', messageSchema, messageConfig);


module.exports = Message;
