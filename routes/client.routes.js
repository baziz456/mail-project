const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API to manage clients.
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               company:
 *                 type: string
 *                 example: "Tech Corp"
 *               designation:
 *                 type: string
 *                 example: "Developer"
 *     responses:
 *       201:
 *         description: Client created
 *       400:
 *         description: Bad request
 */
router.post('/', clientController.createClient);

/**
 * @swagger
 * /clients/by/email:
 *   get:
 *     summary: Get clients by email
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the client to search for
 *     responses:
 *       200:
 *         description: A list of clients with the specified email.
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
 *                   email:
 *                     type: string
 *                     example: client@example.com
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   company:
 *                     type: string
 *                     example: Tech Corp
 *                   designation:
 *                     type: string
 *                     example: Developer
 *       400:
 *         description: Bad request if the email parameter is missing
 *       404:
 *         description: No clients found with the specified email
 *       500:
 *         description: Internal server error
 */
router.get('/by/email', clientController.getClientsByEmail);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: A list of clients.
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
 *                   email:
 *                     type: string
 *                     example: client@example.com
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   company:
 *                     type: string
 *                     example: Example Corp
 *                   designation:
 *                     type: string
 *                     example: Project Manager
 *       500:
 *         description: Internal server error
 */
router.get('/', clientController.getAllClients); // Route for getting all clients

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Retrieve a single client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the client to retrieve
 *     responses:
 *       200:
 *         description: A client object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 company:
 *                   type: string
 *                 designation:
 *                   type: string
 *       404:
 *         description: Client not found
 */
router.get('/:id', clientController.getClientById);

/**
 * @swagger
 * /clients/by/company:
 *   get:
 *     summary: Get clients by company
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: company
 *         required: true
 *         schema:
 *           type: string
 *         description: The company name of the clients to search for.
 *     responses:
 *       200:
 *         description: A list of clients from the specified company.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   client_id:
 *                     type: integer
 *                     example: 2
 *                   email:
 *                     type: string
 *                     example: another.client@example.com
 *                   name:
 *                     type: string
 *                     example: Jane Smith
 *                   company:
 *                     type: string
 *                     example: Example Corp
 *                   designation:
 *                     type: string
 *                     example: Manager
 *       400:
 *         description: Bad request if the company parameter is missing
 *       500:
 *         description: Internal server error
 */
router.get('/by/company', clientController.getClientsByCompany);

/**
 * @swagger
 * /clients/by/designation:
 *   get:
 *     summary: Get clients by designation
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: designation
 *         required: true
 *         schema:
 *           type: string
 *         description: The designation of the clients to search for.
 *     responses:
 *       200:
 *         description: A list of clients with the specified designation.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   client_id:
 *                     type: integer
 *                     example: 3
 *                   email:
 *                     type: string
 *                     example: third.client@example.com
 *                   name:
 *                     type: string
 *                     example: John Smith
 *                   company:
 *                     type: string
 *                     example: Example Inc.
 *                   designation:
 *                     type: string
 *                     example: Director
 *       400:
 *         description: Bad request if the designation parameter is missing
 *       500:
 *         description: Internal server error
 */
router.get('/by/designation', clientController.getClientsByDesignation);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Clients]
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
 *               name:
 *                 type: string
 *               company:
 *                 type: string
 *               designation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated
 *       404:
 *         description: Client not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', clientController.updateClient);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Client deleted
 *       404:
 *         description: Client not found
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;
