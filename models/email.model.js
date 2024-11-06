const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Client = require('./client.model');
const ProjectManager = require('./project_manager.model');

class Email extends Model {
    static associate(models) {
        Email.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
        Email.belongsTo(models.ProjectManager, { foreignKey: 'pm_id', as: 'projectManager' });
    }
}

Email.init({
    email_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clients',
            key: 'client_id',
        },
        allowNull: false,
    },
    pm_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'project_managers',
            key: 'pm_id',
        },
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    is_replied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Email',
    tableName: 'emails',
    timestamps: false,
});

module.exports = Email;
