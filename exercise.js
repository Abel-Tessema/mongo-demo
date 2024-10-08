const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((error) => console.error('Could not connect to MongoDB.', error));

const courseSchema = new mongoose.Schema({
  tags: {
    type: [String],
    validate: {
      validator: function(value, callback) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = value && value.length > 0;
            resolve(result);
          }, 2_000);
        });
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: {type: Date, default: Date.now},
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {return this.isPublished;},
    min: 10,
    max: 200,
    get: value => Math.round(value),
    set: value => Math.round(value)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Accounting Basics',
    category: 'wEb',
    tags: ['accounting', 'finance'],
    author: 'Accounting Stuff',
    isPublished: true,
    price: 21.5
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (e) {
    // console.log(e);
    for (let field in e.errors)
      // console.log(e.errors[field].properties.message);
      console.log(e.errors[field].message);
  }
}

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

// removeCourse('64d2f6b1c9a1b2c3d4e5f6a7');

createCourse();