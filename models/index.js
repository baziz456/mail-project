const Sequelize = require('sequelize');
const sequelize = require('../config/db.config');

const Client = require('./client.model');
const ProjectManager = require('./project_manager.model');
const ClientRecipient = require('./client_recipient.model');
const Recipient = require('./recipient.model'); // Assuming you have a Recipient model
const Email = require('./email.model');

Client.associate({ ClientRecipient, Email });
ProjectManager.associate({ Email });
ClientRecipient.associate({ Client, Recipient });
Email.associate({ Client, ProjectManager });

module.exports = {
    Client,
    ProjectManager,
    ClientRecipient,
    Recipient,
    Email,
    sequelize,
    Sequelize
};
