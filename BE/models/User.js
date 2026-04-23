const { DataTypes } = require('sequelize');
const db = require('../config/database'); 

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true // Ini akan otomatis buat kolom createdAt dan updatedAt
});

module.exports = User;