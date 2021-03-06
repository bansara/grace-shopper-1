const { db } = require('../db');
const { UUID, UUIDV4, STRING } = require('sequelize');

const Session = db.define('Session', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    }
});

module.exports = {
    Session
};