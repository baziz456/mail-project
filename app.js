const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const clientRoutes = require('./routes/client.routes');
const projectManagerRoutes = require('./routes/project_manager.routes');
const recipientRoutes = require('./routes/recipient.routes');
const clientRecipientRouter = require('./routes/client_recipient.routes')
const emailRouter = require('./routes/email.routes');


const app = express(); // Initialize the Express application

// Middleware to parse JSON bodies
app.use(express.json()); // Ensure you can handle JSON request bodies

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
                url: 'http://localhost:3000', // Your server URL
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
});
