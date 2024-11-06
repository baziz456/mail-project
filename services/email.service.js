const Email = require('../models/email.model');
const NotificationUtil = require('../utils/notification.util');

exports.checkEmailStatus = async (clientEmail, pmEmail) => {
    // Find unread emails
    const unreadEmails = await Email.findAll({
        where: { clientEmail, pmEmail, is_read: false }
    });

    if (unreadEmails.length > 0) {
        await NotificationUtil.sendNotification(pmEmail, clientEmail, unreadEmails, 'unread');
    }

    // Find read but not replied emails
    const readNotRepliedEmails = await Email.findAll({
        where: { clientEmail, pmEmail, is_read: true, is_replied: false }
    });

    if (readNotRepliedEmails.length > 0) {
        await NotificationUtil.sendNotification(pmEmail, clientEmail, readNotRepliedEmails, 'read_but_not_replied');
    }
};
