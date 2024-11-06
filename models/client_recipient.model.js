const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class ClientRecipient extends Model {
    static associate(models) {
        ClientRecipient.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
        ClientRecipient.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
    }
}

ClientRecipient.init({
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clients',
            key: 'client_id',
        },
        allowNull: false,
        primaryKey: true,
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'recipients',
            key: 'recipient_id',
        },
        allowNull: false,
        primaryKey: true,
    },
}, {
    sequelize,
    modelName: 'ClientRecipient',
    tableName: 'client_recipients',
    timestamps: false,
});

module.exports = ClientRecipient;
