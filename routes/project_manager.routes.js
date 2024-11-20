// routes/project_manager.routes.js
const express = require('express');
const router = express.Router();
const projectManagerController = require('../controllers/project_manager.controller');

/**
 * @swagger
 * tags:
 *   name: Project Managers
 *   description: API to manage project managers.
 */

/**
 * @swagger
 * /project-managers:
 *   post:
 *     summary: Create a new project manager
 *     tags: [Project Managers]
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
 *               project_name:
 *                 type: string
 *                 example: "Project Alpha"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       201:
 *         description: Project Manager created
 *       400:
 *         description: Bad request
 */
router.post('/', projectManagerController.createProjectManager);

/**
 * @swagger
 * /project-managers:
 *   get:
 *     summary: Get all project managers
 *     tags: [Project Managers]
 *     responses:
 *       200:
 *         description: A list of project managers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pm_id:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   project_name:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', projectManagerController.getAllProjectManagers);

/**
 * @swagger
 * /project-managers/{id}:
 *   get:
 *     summary: Retrieve a single project manager by ID
 *     tags: [Project Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A project manager object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pm_id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *                 project_name:
 *                   type: string
 *       404:
 *         description: Project Manager not found
 */
router.get('/:id', projectManagerController.getProjectManagerById);

/**
 * @swagger
 * /project-managers/{id}:
 *   put:
 *     summary: Update a project manager by ID
 *     tags: [Project Managers]
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
 *               project_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project Manager updated
 *       404:
 *         description: Project Manager not found
 */
router.put('/:id', projectManagerController.updateProjectManager);

/**
 * @swagger
 * /project-managers/{id}:
 *   delete:
 *     summary: Delete a project manager by ID
 *     tags: [Project Managers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Project Manager deleted successfully
 *       404:
 *         description: Project Manager not found
 */
router.delete('/:id', projectManagerController.deleteProjectManager);

/**
 * @swagger
 * /project-managers/by/name:
 *   get:
 *     summary: Get project managers by name
 *     tags: [Project Managers]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of project managers by name
 *       404:
 *         description: No Project Managers found
 */
router.get('/by/name', projectManagerController.getProjectManagersByName);

/**
 * @swagger
 * /project-managers/by/project-name:
 *   get:
 *     summary: Get project managers by project name
 *     tags: [Project Managers]
 *     parameters:
 *       - in: query
 *         name: project_name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of project managers by project name
 *       404:
 *         description: No Project Managers found
 */
router.get('/by/project-name', projectManagerController.getProjectManagersByProjectName);

module.exports = router;
