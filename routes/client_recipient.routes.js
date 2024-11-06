const express = require('express');
const router = express.Router();
const clientRecipientController = require('../controllers/client_recipient.controller');

/**
 * @swagger
 * tags:
 *   name: ClientRecipients
 *   description: API to manage client-recipient relationships.
 */

/**
 * @swagger
 * /client-recipients:
 *   post:
 *     summary: Create a client-recipient relationship
 *     tags: [ClientRecipients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               recipient_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Client-recipient relationship created
 *       400:
 *         description: Bad request
 */
router.post('/', clientRecipientController.createClientRecipient);

/**
 * @swagger
 * /client-recipients:
 *   get:
 *     summary: Retrieve all client-recipient relationships
 *     tags: [ClientRecipients]
 *     responses:
 *       200:
 *         description: A list of client-recipient relationships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   client_id:
 *                     type: integer
 *                     example: 1
 *                   recipient_id:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Internal server error
 */
router.get('/', clientRecipientController.getAllClientRecipients);

/**
 * @swagger
 * /client-recipients/{client_id}/{recipient_id}:
 *   put:
 *     summary: Update a client-recipient relationship
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: recipient_id
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
 *               client_id:
 *                 type: integer
 *               recipient_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Client-recipient relationship updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Client-recipient relationship updated"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Client-recipient relationship not found
 */
router.put('/:client_id/:recipient_id', clientRecipientController.updateClientRecipient);


/**
 * @swagger
 * /client-recipients/{client_id}/{recipient_id}:
 *   delete:
 *     summary: Delete a client-recipient relationship
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: path
 *         name: client_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: recipient_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client-recipient relationship deleted
 *       404:
 *         description: Relationship not found
 */
router.delete('/:client_id/:recipient_id', clientRecipientController.deleteClientRecipient);

/**
 * @swagger
 * /client-recipients/by/client-name:
 *   get:
 *     summary: Get relationships by client name
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: query
 *         name: client_name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the client to search for
 *     responses:
 *       200:
 *         description: Relationships with the specified client name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No relationships found
 */
router.get('/by/client-name', clientRecipientController.getByClientName);

/**
 * @swagger
 * /client-recipients/by/client-email:
 *   get:
 *     summary: Get relationships by client email
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: query
 *         name: client_email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relationships with the specified client email
 *       404:
 *         description: No relationships found
 */
router.get('/by/client-email', clientRecipientController.getByClientEmail);

/**
 * @swagger
 * /client-recipients/by/client-company:
 *   get:
 *     summary: Get relationships by client company
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: query
 *         name: client_company
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relationships with the specified client company
 *       404:
 *         description: No relationships found
 */
router.get('/by/client-company', clientRecipientController.getByClientCompany);

/**
 * @swagger
 * /client-recipients/by/recipient-email:
 *   get:
 *     summary: Get relationships by recipient email
 *     tags: [ClientRecipients]
 *     parameters:
 *       - in: query
 *         name: recipient_email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Relationships with the specified recipient email
 *       404:
 *         description: No relationships found
 */
router.get('/by/recipient-email', clientRecipientController.getByRecipientEmail);

module.exports = router;
