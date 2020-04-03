/* eslint-disable template-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable quote-props */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-plusplus */
const fake = require('faker');
const mongoose = require('mongoose');

const profileImg = [
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-african-american-afro-black-female-1181519.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-attractive-beautiful-beauty-415829.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-beard-boy-casual-220453.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/adult-businessman-close-up-corporate-428364.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/close-up-photography-of-man-wearing-sunglasses-1212984.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/closeup-photo-of-smiling-woman-wearing-blue-denim-jacket-1130626.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/face-facial-hair-fine-looking-guy-614810.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-in-black-shirt-35065.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-in-red-jacket-1681010.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/man-wearing-black-zip-up-jacket-near-beach-smiling-at-the-736716.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/men-s-wearing-black-suit-jacket-and-pants-937481.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/photo-of-a-woman-smiling-1520760.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/photography-of-a-guy-wearing-green-shirt-1222271.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/portrait-photo-of-smiling-man-with-his-arms-crossed-standing-2379004.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/smiling-woman-wearing-black-sweater-1587009.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-in-black-scoop-neck-shirt-smiling-38554.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-smiling-at-the-camera-1181686.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-wearing-coat-762020.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/woman-with-red-lips-leaning-on-green-garment-in-selective-1758845.jpg',
  'https://elclectictacoportraits.s3-us-west-1.amazonaws.com/women-s-white-and-black-button-up-collared-shirt-774909.jpg',
];

mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('its gravy');
});

const restaurantSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },
  name: String,
  reviews: [],
});

const userSchema = new mongoose.Schema({
  _user_id: { type: Number, unique: true },
  name: String,
  profile_pic: String,
  reviews: Number,
  friends: Number,
  photos: Number,
  location: String,
});

const reviewSchema = new mongoose.Schema({
  _review_id: { type: Number, unique: true },
  id_User: Number,
  id_Restaurants: Number,
  date: Date,
  rating: Number,
  body: String,
  useful_count: Number,
  cool_count: Number,
  funny_count: Number,
  check_ins: Number,
  useful_vote: { type: Number, default: 0 },
  cool_vote: { type: Number, default: 0 },
  funny_vote: { type: Number, default: 0 },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

// i <= 25000
for (let i = 1; i <= 2000; i++) {
  const oneUser = new User({
    _user_id: i,
    name: `${fake.name.firstName()  } ${   fake.name.lastName()[0]  }.`,
    profile_pic: profileImg[i % 19],
    reviews: fake.random.number({'min': 50, 'max': 1000}),
    friends: fake.random.number({'min': 50, 'max': 1000}),
    photos: fake.random.number({'min': 50, 'max': 1000}),
    location: `${fake.address.city()  }, ${  fake.address.stateAbbr()}`,
  });
  oneUser.save((err, user) => {
    if (err) { return console.log(err); }
    console.log('added: ', user.name);
  });
}
// i < 25000
for (let i = 1; i < 101; i += 1) {

  const reviewsArray = [];
  // i % 7 !== 0 ? Math.floor(Math.random() * Math.floor(1000)) : 1000
  for (let j = 1; j < 101; j++) {
    reviewsArray.push(((i - 1) * 100) + j);
    const oneReview = new Review({
      _review_id: ((i - 1) * 100) + j,
      id_User: fake.random.number({'min': 1, 'max': 2000}),
      id_Restaurants: i,
      date: fake.date.between('2000-01-10', '2020-01-21').slice(0, 10),
      rating: fake.random.number({'min': 1, 'max': 5}),
      body: fake.lorem.sentences(20),
      useful_count: fake.random.number({'min': 1, 'max': 9}),
      cool_count: fake.random.number({'min': 1, 'max': 6}),
      funny_count: fake.random.number({'min': 1, 'max': 3}),
      check_ins: fake.random.number({'min': 0, 'max': 3}),
    });
    oneReview.save((err, review) => {
      if (err) { console.log(err); }
      console.log('added: ', review.date);
    });
  }

  const oneRestaurant = new Restaurant({
    _id: i,
    name: fake.company.companyName(),
    reviews: reviewsArray,
  });
  oneRestaurant.save((err, restaurant) => {
    if (err) { return console.log(err); }
    console.log('added: ', restaurant.name);
  });
}
