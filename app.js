const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const clientRoutes = require('./routes/client.routes');
const projectManagerRoutes = require('./routes/project_manager.routes');
const recipientRoutes = require('./routes/recipient.routes');
const clientRecipientRouter = require('./routes/client_recipient.routes');
const emailRouter = require('./routes/email.routes');
const cron = require('node-cron');
const { ProjectManager } = require('./models');
const { fetchEmails, checkForUnrepliedEmails, imapConfig } = require('./services/email.service');
const sequelize = require('./config/db.config');

async function processProjectManagerEmails() {
    try {
        console.log("after 1 minute over");
        const projectManagers = await ProjectManager.findAll();

        for (const pm of projectManagers) {
            console.log("email length:", pm.email.length, "password length:", pm.password.length);
            console.log("email:", pm.email.trim(), "password:", pm.password.trim());
            const config = imapConfig(pm.email, pm.password);
            await fetchEmails(pm, config);
        }

        await checkForUnrepliedEmails();
    } catch (error) {
        console.error('Error processing project manager emails:', error);
    }
}

// Schedule task to run every minute (instead of every 5 minutes)
cron.schedule('*/1 * * * *', processProjectManagerEmails); // This runs every minute

const app = express(); // Initialize the Express application

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Path to the API route files
};

// Initialize swagger-jsdoc with the options
const swaggerDocument = swaggerJsDoc(options);

// Serve Swagger documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register client routes
app.use('/clients', clientRoutes);
// Register project managers routes
app.use('/project-managers', projectManagerRoutes);
// Register recipients routes
app.use('/recipients', recipientRoutes);
// Register client recipients routes
app.use('/client-recipients', clientRecipientRouter);
// Register email routes
app.use('/emails', emailRouter);

// Define your routes here
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // Syncing database
    sequelize.sync().then(() => {
        console.log('Database connected and synced');
    });
});
