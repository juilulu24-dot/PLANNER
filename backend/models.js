// Exemple de modèles Mongoose pour MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  deadline: Date,
  priority: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const courseSchema = new mongoose.Schema({
  title: String,
  time: String,
  location: String,
  color: String,
  day: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const subjectSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Task: mongoose.model('Task', taskSchema),
  Course: mongoose.model('Course', courseSchema),
  Subject: mongoose.model('Subject', subjectSchema)
};
