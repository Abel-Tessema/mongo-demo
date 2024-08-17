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
    .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
    // .or([{tags: 'frontend'}, {tags: 'backend'}])
    .sort('-price')
    .select('name author price');
}

getCourses()
  .then(courses => console.log('Courses:\n', courses));