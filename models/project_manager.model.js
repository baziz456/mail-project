const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

class ProjectManager extends Model {
    static associate(models) {
        ProjectManager.hasMany(models.Email, { foreignKey: 'pm_id', as: 'emails' });
    }
}

ProjectManager.init({
    pm_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    project_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ProjectManager',
    tableName: 'project_managers',
    timestamps: false,
});

module.exports = ProjectManager;
