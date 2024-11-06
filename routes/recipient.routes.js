const express = require('express');
const router = express.Router();
const recipientController = require('../controllers/recipient.controller');

/**
 * @swagger
 * tags:
 *   name: Recipients
 *   description: API to manage recipients.
 */

/**
 * @swagger
 * /recipients:
 *   post:
 *     summary: Create a new recipient
 *     tags: [Recipients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "recipient@example.com"
 *     responses:
 *       201:
 *         description: Recipient created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', recipientController.createRecipient);

/**
 * @swagger
 * /recipients:
 *   get:
 *     summary: Retrieve all recipients
 *     tags: [Recipients]
 *     responses:
 *       200:
 *         description: List of all recipients
 */
router.get('/', recipientController.getAllRecipients);

/**
 * @swagger
 * /recipients/{id}:
 *   get:
 *     summary: Retrieve a recipient by ID
 *     tags: [Recipients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recipient data
 *       404:
 *         description: Recipient not found
 */
router.get('/:id', recipientController.getRecipientById);

/**
 * @swagger
 * /recipients/{id}:
 *   put:
 *     summary: Update a recipient by ID
 *     tags: [Recipients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipient updated
 *       404:
 *         description: Recipient not found
 */
router.put('/:id', recipientController.updateRecipient);

/**
 * @swagger
 * /recipients/{id}:
 *   delete:
 *     summary: Delete a recipient by ID
 *     tags: [Recipients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Recipient deleted successfully
 *       404:
 *         description: Recipient not found
 */
router.delete('/:id', recipientController.deleteRecipient);

/**
 * @swagger
 * /recipients/by/email:
 *   get:
 *     summary: Retrieve a recipient by email
 *     tags: [Recipients]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipient data
 *       404:
 *         description: Recipient not found
 */
router.get('/by/email', recipientController.getRecipientByEmail);

module.exports = router;
