const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB.', error));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: {type: Date, default: Date.now},
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return Course
    .find({isPublished: true, tags: {$all: ['backend']}}) // Looks for results that contain all the tags.
    // .find({isPublished: true, tags: {$in: ['backend', 'node']}}) // Looks for results that contain at least one of the tags.
    .sort({name: 1})
    .select({name: 1, author: 1});
}

getCourses()
  .then(courses => console.log('Courses:\n', courses));