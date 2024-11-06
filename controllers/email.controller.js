const { Email, Client, ProjectManager } = require('../models');

// Create a new email
exports.createEmail = async (req, res) => {
    try {
        const { client_id, pm_id, subject, body, is_read, is_replied } = req.body;

        // Validate client_id
        const client = await Client.findByPk(client_id);
        if (!client) {
            return res.status(400).json({ error: 'Invalid client_id' });
        }

        // Validate pm_id
        const projectManager = await ProjectManager.findByPk(pm_id);
        if (!projectManager) {
            return res.status(400).json({ error: 'Invalid pm_id' });
        }

        const email = await Email.create({ client_id, pm_id, subject, body, is_read, is_replied });
        res.status(201).json({ message: 'Email created successfully', data: email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all emails with associated Client and ProjectManager
exports.getAllEmails = async (req, res) => {
    try {
        const emails = await Email.findAll({
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['client_id', 'name', 'email', 'company', 'designation'],
                },
                {
                    model: ProjectManager,
                    as: 'projectManager',
                    attributes: ['pm_id', 'name', 'email', 'project_name'],
                },
            ],
        });
        res.status(200).json({ data: emails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get email by ID with associated Client and ProjectManager
exports.getEmailById = async (req, res) => {
    try {
        const { email_id } = req.params;
        const email = await Email.findByPk(email_id, {
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['client_id', 'name', 'email', 'company', 'designation'],
                },
                {
                    model: ProjectManager,
                    as: 'projectManager',
                    attributes: ['pm_id', 'name', 'email', 'project_name'],
                },
            ],
        });

        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(200).json({ data: email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an email by ID
exports.updateEmail = async (req, res) => {
    try {
        const { email_id } = req.params;
        const { client_id, pm_id, subject, body, is_read, is_replied } = req.body;

        const email = await Email.findByPk(email_id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Validate client_id if it's being updated
        if (client_id && client_id !== email.client_id) {
            const client = await Client.findByPk(client_id);
            if (!client) {
                return res.status(400).json({ error: 'Invalid client_id' });
            }
        }

        // Validate pm_id if it's being updated
        if (pm_id && pm_id !== email.pm_id) {
            const projectManager = await ProjectManager.findByPk(pm_id);
            if (!projectManager) {
                return res.status(400).json({ error: 'Invalid pm_id' });
            }
        }

        // Update the email
        await email.update({ client_id, pm_id, subject, body, is_read, is_replied });

        res.status(200).json({ message: 'Email updated successfully', data: email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an email by ID
exports.deleteEmail = async (req, res) => {
    try {
        const { email_id } = req.params;
        const deleted = await Email.destroy({ where: { email_id } });

        if (!deleted) {
            return res.status(404).json({ message: 'Email not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get emails by client details: name, email, company
exports.getEmailsByClientDetails = async (req, res) => {
    try {
        const { client_name, client_email, client_company } = req.query;

        if (!client_name && !client_email && !client_company) {
            return res.status(400).json({ error: 'At least one client filter parameter is required' });
        }

        const emails = await Email.findAll({
            include: [
                {
                    model: Client,
                    as: 'client',
                    where: {
                        ...(client_name && { name: client_name }),
                        ...(client_email && { email: client_email }),
                        ...(client_company && { company: client_company }),
                    },
                    attributes: ['client_id', 'name', 'email', 'company', 'designation'],
                },
                {
                    model: ProjectManager,
                    as: 'projectManager',
                    attributes: ['pm_id', 'name', 'email', 'project_name'],
                },
            ],
        });

        res.status(200).json({ data: emails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get emails by project manager details: name, email, project_name
exports.getEmailsByPmDetails = async (req, res) => {
    try {
        const { pm_name, pm_email, project_name } = req.query;

        if (!pm_name && !pm_email && !project_name) {
            return res.status(400).json({ error: 'At least one project manager filter parameter is required' });
        }

        const emails = await Email.findAll({
            include: [
                {
                    model: Client,
                    as: 'client',
                    attributes: ['client_id', 'name', 'email', 'company', 'designation'],
                },
                {
                    model: ProjectManager,
                    as: 'projectManager',
                    where: {
                        ...(pm_name && { name: pm_name }),
                        ...(pm_email && { email: pm_email }),
                        ...(project_name && { project_name }),
                    },
                    attributes: ['pm_id', 'name', 'email', 'project_name'],
                },
            ],
        });

        res.status(200).json({ data: emails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
