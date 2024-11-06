const Recipient = require('../models/recipient.model');

exports.createRecipient = async (req, res) => {
    try {
        const { email } = req.body;
        const recipient = await Recipient.create({ email });
        res.status(201).json(recipient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRecipients = async (req, res) => {
    try {
        const recipients = await Recipient.findAll();
        res.status(200).json(recipients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipientById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateRecipient = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        recipient.email = email;
        await recipient.save();
        res.status(200).json(recipient);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteRecipient = async (req, res) => {
    try {
        const { id } = req.params;
        const recipient = await Recipient.findByPk(id);
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        await recipient.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecipientByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const recipient = await Recipient.findOne({ where: { email } });
        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
