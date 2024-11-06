const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Client extends Model {
    static associate(models) {
        Client.hasMany(models.ClientRecipient, { foreignKey: 'client_id', as: 'clientRecipients' });
        Client.hasMany(models.Email, { foreignKey: 'client_id', as: 'emails' });
    }
}

Client.init({
    client_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Client',
    tableName: 'clients',
    timestamps: false,
});

module.exports = Client;
