const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('MongoDB Connected...'))
  .catch(error => console.error('Something\'s not right.', error));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'React.js Course',
    author: 'Bela Jash',
    tags: ['react', 'frontend'],
    isPublished: true
  });
  
  const result = await course.save();
  console.log(result);
}

createCourse();