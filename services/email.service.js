const imaps = require('imap-simple');
const { Email, ProjectManager } = require('../models');
const nodemailer = require('nodemailer');

const imapConfig = (email, password) => ({
    imap: {
        user: email,
        password: password,
        host: 'imap.codeautomation.ai',
        port: 993,
        tls: true,
        authTimeout: 10000,
        connectionTimeout: 15000,
    }
});


async function fetchEmails(pm, config) {
    try {
        try {
            const connection = await imaps.connect(config);
            console.log('Connected to IMAP server successfully.');
            // Proceed with fetching emails
        } catch (error) {
            console.error('Error connecting to IMAP server:', error);
        }

        await connection.openBox('INBOX');

        const searchCriteria = ['UNSEEN'];
        const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };

        const messages = await connection.search(searchCriteria, fetchOptions);

        for (const message of messages) {
            const fromAddress = message.parts[0].body.from[0];
            const clientEmail = fromAddress.match(/<(.+)>/)[1];

            const client = await Client.findOne({ where: { email: clientEmail } });
            const client_id = client ? client.client_id : null;

            if (client_id) {
                const emailRecord = {
                    client_id,
                    pm_id: pm.pm_id,
                    subject: message.parts[0].body.subject[0],
                    body: message.parts[1].body,
                    is_read: false,
                    is_replied: false,
                };
                await Email.create(emailRecord);
            }
        }
        connection.end();
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}


async function checkForUnrepliedEmails() {
    const threshold = 60 * 1000; // 30 minutes in milliseconds
    const now = new Date();

    const emails = await Email.findAll({
        where: { is_read: true, is_replied: false },
    });

    for (const email of emails) {
        const timeDiff = now - new Date(email.created_at);
        if (timeDiff > threshold) {
            const pm = await ProjectManager.findByPk(email.pm_id);
            await sendNotification(pm, email.subject, email.body);
        }
    }
}


async function sendNotification(pm, subject, body) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.codeautomation.ai', // Use your SMTP server here
        port: 465,
        secure: true, // Use true for port 465, false for other ports
        auth: {
            user: pm.email,
            pass: pm.password,
        },
    });

    const mailOptions = {
        from: pm.email,
        to: pm.email,
        subject: `Unreplied Client Email: ${subject}`,
        text: `You have an unreplied email:\n\n${body}`,
    };

    await transporter.sendMail(mailOptions);
}


module.exports = { fetchEmails, checkForUnrepliedEmails, imapConfig };
