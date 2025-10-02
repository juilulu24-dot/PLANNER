const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/planner';

function connectDB() {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch((err) => console.error('Erreur MongoDB:', err));
}

module.exports = connectDB;
