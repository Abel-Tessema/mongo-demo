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
    
    // Starts with 'Bela', and case-insensitive
    .find({author: /^Bela/i})
    
    // Ends with 'Jash'
    .find({author: /Jash$/})
    
    // Contains 'Bela'
    .find({author: /.*Bela.*/})
    
    .limit(2)
    .sort({name: 1})
    .countDocuments();
  console.log(courses);
}

getCourses();