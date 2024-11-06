// const ClientRecipient = require('../models/client_recipient.model');
// const Recipient = require('../models/recipient.model');
// const Client = require('../models/client.model');
const { Client, Recipient, ClientRecipient } = require('../models');

exports.createClientRecipient = async (req, res) => {
    try {
        const { client_id, recipient_id } = req.body;
        const clientRecipient = await ClientRecipient.create({ client_id, recipient_id });
        res.status(201).json({ message: 'Client-Recipient relationship created', data: clientRecipient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllClientRecipients = async (req, res) => {
    try {
        const clientRecipients = await ClientRecipient.findAll({
            include: [
                {
                    model: Client,
                    attributes: ['client_id', 'name', 'email', 'company', 'designation'],
                },
                {
                    model: Recipient,
                    attributes: ['recipient_id', 'email'],
                },
            ],
            attributes: ['client_id', 'recipient_id'],
        });

        res.status(200).json(clientRecipients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving client-recipient relationships.' });
    }
};

exports.updateClientRecipient = async (req, res) => {
    const { client_id, recipient_id } = req.params;

    try {
        // Find the ClientRecipient by client_id and recipient_id
        const clientRecipient = await ClientRecipient.findOne({
            where: { client_id, recipient_id }
        });

        // Check if the record exists
        if (!clientRecipient) {
            return res.status(404).json({ error: 'ClientRecipient not found' });
        }

        // Update the ClientRecipient record with new values
        await clientRecipient.update(req.body); // Assuming req.body contains the new values

        // Return the updated record
        res.status(200).json({ message: 'ClientRecipient updated successfully', data: clientRecipient });
    } catch (error) {
        console.error("Error updating ClientRecipient:", error);
        res.status(500).json({ error: error.message });
    }
};



exports.deleteClientRecipient = async (req, res) => {
    try {
        const { client_id, recipient_id } = req.params;
        const result = await ClientRecipient.destroy({ where: { client_id, recipient_id } });
        if (result) {
            res.status(204).json({ message: 'Client-Recipient relationship deleted' });
        } else {
            res.status(404).json({ message: 'Relationship not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByClientName = async (req, res) => {
    try {
        console.log("Request Query:", req.query);
        const { client_name } = req.query;

        if (!client_name) {
            return res.status(400).json({ error: "Name query parameter is required" });
        }

        const clientRecipients = await ClientRecipient.findAll({
            include: [{
                model: Client,
                where: { name: client_name }
            }]
        });

        res.status(200).json({ data: clientRecipients });
    } catch (error) {
        console.error("Error fetching client recipients:", error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};


exports.getByClientEmail = async (req, res) => {
    try {
        console.log("Request Query:", req.query);
        const { client_email } = req.query;
        const clientRecipients = await ClientRecipient.findAll({
            include: [{
                model: Client,
                where: { email: client_email }
            }]
        });
        res.status(200).json({ data: clientRecipients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByClientCompany = async (req, res) => {
    try {
        console.log("Request Query:", req.query);
        const { client_company } = req.query;
        const clientRecipients = await ClientRecipient.findAll({
            include: [{
                model: Client,
                where: { company: client_company }
            }]
        });
        res.status(200).json({ data: clientRecipients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getByRecipientEmail = async (req, res) => {
    try {
        console.log("Request Query:", req.query);
        const { recipient_email } = req.query;
        const clientRecipients = await ClientRecipient.findAll({
            include: [{
                model: Recipient,
                where: { email: recipient_email }
            }]
        });
        res.status(200).json({ data: clientRecipients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
