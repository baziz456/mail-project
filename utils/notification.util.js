exports.sendNotification = async (pmEmail, clientEmail, emails, type) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const emailContent = emails.map(email => `Subject: ${email.subject}`).join('<br>');

    let subject;
    let message;
    if (type === 'unread') {
        subject = 'Unread Email Notification';
        message = `<p>You have unread emails from client ${clientEmail}:</p><br>${emailContent}`;
    } else if (type === 'read_but_not_replied') {
        subject = 'Read But Not Replied Email Notification';
        message = `<p>You have read but not replied to the following emails from client ${clientEmail}:</p><br>${emailContent}`;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: [pmEmail, ...recipients].join(','), // Send to PM and recipients
        subject: subject,
        html: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};
