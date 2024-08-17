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
    .find({isPublished: true})
    .or([{price: {$gte: 20}}, {name: /.*guide.*/i}])
    .sort('-price')
    .select('name author price');
}

async function updateCourse(id) {
  // const result = await Course.updateOne({_id: id}, {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      isPublished: true,
      author: 'Joshua'
    }
  }, {new: true});
  
  console.log('Result:\n', result);
}

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});
  const result = await Course.findByIdAndDelete(id);
  
  console.log('Result:\n', result);
}

// getCourses()
//   .then(courses => console.log('Courses:\n', courses));

removeCourse('64d2f6b1c9a1b2c3d4e5f6a7');