const Client = require('../models/client.model');

exports.createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json({ message: 'Client created', data: client });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getClientsByEmail = async (req, res) => {
    const { email } = req.query;

    // Check if the email parameter is provided
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const clients = await Client.findAll({ where: { email } });

        // Check if any clients were found
        if (clients.length === 0) {
            return res.status(404).json({ error: 'No clients found with this email' });
        }

        // Respond with the found clients
        res.status(200).json({ data: clients });
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll(); // Fetch all clients from the database
        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            res.status(200).json({ data: client });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getClientsByCompany = async (req, res) => {
    const { company } = req.query;

    if (!company) {
        return res.status(400).json({ error: 'Company is required' });
    }

    try {
        const clients = await Client.findAll({ where: { company } });
        res.status(200).json({ data: clients });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getClientsByDesignation = async (req, res) => {
    const { designation } = req.query;

    if (!designation) {
        return res.status(400).json({ error: 'Designation is required' });
    }

    try {
        const clients = await Client.findAll({ where: { designation } });
        res.status(200).json({ data: clients });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const [updated] = await Client.update(req.body, {
            where: { client_id: req.params.id },
        });
        if (updated) {
            const client = await Client.findByPk(req.params.id);
            res.status(200).json({ message: 'Client updated', data: client });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const deleted = await Client.destroy({
            where: { client_id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({ message: 'Client deleted' });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
