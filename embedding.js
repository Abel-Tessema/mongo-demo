const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/playground-2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.error('Could not connect to MongoDB.', error));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
})

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {type: authorSchema, required: true}
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

async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate(
    courseId,
    // {$set: {'author.name': 'Challa Chube Chebette', 'author.bio': 'My bio'}},
    {$unset: {'author': ''}},
    // {author: {name: 'Bela Jash'}},
    {new: true}
  );
  console.log(course);
}

updateAuthor('66c30745bcccf43e7aaebd0d');

// createCourse('Node Course', new Author({name: 'Bela', bio: 'My bio', website: 'My website'}));

// listCourses();