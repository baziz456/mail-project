const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mail Project',
            version: '1.0.0',
            description: 'API to manage clients',
        },
    },
    apis: ['../routes/client.routes.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
