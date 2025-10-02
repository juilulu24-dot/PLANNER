require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const { User, Task, Course, Subject } = require('./models');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Exemple route: création d’une tâche
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Autres routes CRUD à ajouter ici (User, Course, Subject)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});
