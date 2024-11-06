const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

/**
 * @swagger
 * tags:
 *   name: Emails
 *   description: API for managing emails
 */

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Create a new email
 *     tags: [Emails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - pm_id
 *               - subject
 *               - body
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               pm_id:
 *                 type: integer
 *                 example: 2
 *               subject:
 *                 type: string
 *                 example: "Meeting Reminder"
 *               body:
 *                 type: string
 *                 example: "Don't forget about the meeting tomorrow at 10 AM."
 *               is_read:
 *                 type: boolean
 *                 example: false
 *               is_replied:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Email created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Email'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/', emailController.createEmail);

/**
 * @swagger
 * /emails:
 *   get:
 *     summary: Get all emails with associated client and project manager details
 *     tags: [Emails]
 *     responses:
 *       200:
 *         description: A list of emails
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmailWithAssociations'
 *       500:
 *         description: Internal server error
 */
router.get('/', emailController.getAllEmails);

/**
 * @swagger
 * /emails/{email_id}:
 *   get:
 *     summary: Get an email by ID with associated client and project manager details
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: email_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the email to retrieve
 *     responses:
 *       200:
 *         description: Email data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/EmailWithAssociations'
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.get('/:email_id', emailController.getEmailById);

/**
 * @swagger
 * /emails/{email_id}:
 *   put:
 *     summary: Update an existing email by ID
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: email_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the email to update
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
 *               pm_id:
 *                 type: integer
 *                 example: 2
 *               subject:
 *                 type: string
 *                 example: "Updated Subject"
 *               body:
 *                 type: string
 *                 example: "Updated email body."
 *               is_read:
 *                 type: boolean
 *                 example: true
 *               is_replied:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Email updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/EmailWithAssociations'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.put('/:email_id', emailController.updateEmail);

/**
 * @swagger
 * /emails/{email_id}:
 *   delete:
 *     summary: Delete an email by ID
 *     tags: [Emails]
 *     parameters:
 *       - in: path
 *         name: email_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the email to delete
 *     responses:
 *       204:
 *         description: Email deleted successfully
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:email_id', emailController.deleteEmail);

/**
 * @swagger
 * /emails/by/client:
 *   get:
 *     summary: Get emails filtered by client details (name, email, company)
 *     tags: [Emails]
 *     parameters:
 *       - in: query
 *         name: client_name
 *         schema:
 *           type: string
 *         description: The name of the client
 *       - in: query
 *         name: client_email
 *         schema:
 *           type: string
 *         description: The email of the client
 *       - in: query
 *         name: client_company
 *         schema:
 *           type: string
 *         description: The company name of the client
 *     responses:
 *       200:
 *         description: A list of emails filtered by client details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmailWithAssociations'
 *       400:
 *         description: At least one client filter parameter is required
 *       500:
 *         description: Internal server error
 */
router.get('/by/client', emailController.getEmailsByClientDetails);

/**
 * @swagger
 * /emails/by/pm:
 *   get:
 *     summary: Get emails filtered by project manager details (name, email, project_name)
 *     tags: [Emails]
 *     parameters:
 *       - in: query
 *         name: pm_name
 *         schema:
 *           type: string
 *         description: The name of the project manager
 *       - in: query
 *         name: pm_email
 *         schema:
 *           type: string
 *         description: The email of the project manager
 *       - in: query
 *         name: project_name
 *         schema:
 *           type: string
 *         description: The project name
 *     responses:
 *       200:
 *         description: A list of emails filtered by project manager details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EmailWithAssociations'
 *       400:
 *         description: At least one project manager filter parameter is required
 *       500:
 *         description: Internal server error
 */
router.get('/by/pm', emailController.getEmailsByPmDetails);

module.exports = router;
