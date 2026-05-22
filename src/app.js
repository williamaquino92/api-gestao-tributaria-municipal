const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const contribuintesRoutes = require('./routes/contribuintes')

const app = express();

const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API Gestão Tributária Municipal online'
    });
});

app.use('/auth', authRoutes);
app.use('/contribuintes', contribuintesRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/ping', (req, res) => {
    res.json({
        mensagem: 'API online'
    });
});

module.exports = app;