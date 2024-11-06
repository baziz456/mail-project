const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class Recipient extends Model {
    static associate(models) {
        Recipient.hasMany(models.ClientRecipient, { foreignKey: 'recipient_id', as: 'clientRecipients' });
    }
}

Recipient.init({
    recipient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Recipient',
    tableName: 'recipients',
    timestamps: false,
});

module.exports = Recipient;
