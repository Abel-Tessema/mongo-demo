const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/playground-2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(error => console.error('Could not connect to MongoDB.', error));

const authorSchema = new mongoose.Schema({
  name: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createAuthor(name, bio, website) {
  const author = new Author({name, bio, website});
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({name, authors});
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  const result = await course.save();
  console.log(result);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.find(author => author._id === authorId);
  const index = course.authors.indexOf(author);
  course.authors.splice(index, 1);
  const result = await course.save();
  console.log(result);
  
  /* Mosh's solution (doesn't work)
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
  */
}

removeAuthor('66c31d1426d5cf7754b4e0f2', '66c321db6fa21b0ce5652d3c');

// addAuthor('66c31d1426d5cf7754b4e0f2', new Author({name: 'Debebe'}));

// updateAuthor('66c30745bcccf43e7aaebd0d');

// createCourse('Node Course', [
//   new Author({name: 'Bela'}),
//   new Author({name: 'Tichegeraleh'})
// ]);

// listCourses();