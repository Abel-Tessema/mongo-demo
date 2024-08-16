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

async function getCourses() {
  // eq = equal
  // ne = not equal
  // gt = greater than
  // gte = greater than or equal to
  // lt = less than
  // lte = less than or equal to
  // in = in
  // nin = not in
  const courses = await Course
    // .find({author: 'Bela Jash', isPublished: true})
    // .find({price: {$gte: 10, $lte: 20}})
    .find({price: {$in: [10, 15, 20]}})
    .limit(2)
    .sort({name: 1})
    .select({name: 1, tags: 1});
  console.log(courses)
}

getCourses();