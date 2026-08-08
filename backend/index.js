const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendorRoutes');
const criteriaRoutes = require('./routes/criteriaRoutes');
const credibilityRoutes = require('./routes/credibilityRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Test DB connection using Sequelize
sequelize.authenticate()
  .then(() => console.log('Connected to MySQL database via Sequelize'))
  .catch(err => console.error('Unable to connect to the database:', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to EventVet');
});

app.use('/api/vendors', vendorRoutes);
app.use('/api/criteria', criteriaRoutes);
app.use('/api/credibility', credibilityRoutes);

// Optionally sync models in development (disable in production)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ alter: true }).then(() => console.log('Database synced'));
}

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
