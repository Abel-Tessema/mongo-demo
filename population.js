const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/playground-2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.error('Could not connect to MongoDB.', error));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
}));

async function createAuthor(name, bio, website) {
  const author = new Author({name, bio, website});
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({name, author});
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author -_id');
  console.log(courses);
}

// createAuthor('Bela', 'My bio', 'My website');

// createCourse('Node Course', '66c300850ba73952c9c3c863');

listCourses();