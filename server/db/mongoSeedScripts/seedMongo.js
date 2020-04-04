/* eslint-disable template-curly-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable quote-props */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-plusplus */
// const fake = require('faker');
// const mongoose = require('mongoose');


//   const oneRestaurant = new Restaurant({
//     _id: i,
//     name: fake.company.companyName(),
//     reviews: reviewsArray,
//   });


// const restaurantSchema = new mongoose.Schema({
//   _id: { type: Number, unique: true },
//   name: String,
//   reviews: [],
// });

// const userSchema = new mongoose.Schema({
//   _user_id: { type: Number, unique: true },
//   name: String,
//   profile_pic: String,
//   reviews: Number,
//   friends: Number,
//   photos: Number,
//   location: String,
// });

// const reviewSchema = new mongoose.Schema({
//   // _id: Number,
//   _review_id: { type: Number, unique: true },
//   id_User: Number,
//   id_Restaurants: Number,
//   date: Date,
//   rating: Number,
//   body: String,
//   useful_count: Number,
//   cool_count: Number,
//   funny_count: Number,
//   check_ins: Number,
//   useful_vote: { type: Number, default: 0 },
//   cool_vote: { type: Number, default: 0 },
//   funny_vote: { type: Number, default: 0 },
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);
// const User = mongoose.model('User', userSchema);
// const Review = mongoose.model('Review', reviewSchema);


// mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true });

// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => { console.log('connected'); });


// const userArrayOne = [];
// const userArrayTwo = [];
// const userArrayThree = [];
// const userArrayFour = [];
// const userArrayFive = [];
// for (let i = 1; i <= 100000; i++) {
//   const oneUser = new User({
//     _user_id: i,
//     name: `${fake.name.firstName()  } ${   fake.name.lastName()[0]  }.`,
//     profile_pic: profileImg[i % 19],
//     reviews: Math.floor(Math.random() * 950 + 50),
//     friends: Math.floor(Math.random() * 950 + 50),
//     photos: Math.floor(Math.random() * 950 + 50),
//     location: `${fake.address.city()  }, ${  fake.address.stateAbbr()}`,
//   });
//   if (i <= 20000) {
//     userArrayOne.push(oneUser);
//   } else if (i <= 40000) {
//     userArrayTwo.push(oneUser);
//   } else if (i <= 60000) {
//     userArrayThree.push(oneUser);
//   } else if (i <= 80000) {
//     userArrayFour.push(oneUser);
//   } else if (i <= 100000) {
//     userArrayFive.push(oneUser);
//   }
// }
// User.insertMany(userArrayOne)
//   .then(() => { console.log('added: ', userArrayOne.length); })
//   .catch(() => { console.log('ERROR'); })
//   .then(() => db.close(() => { console.log('connection closed'); }))
//   .then(() => { mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true }); })
//   .then(() => {
//     db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', () => { console.log('reconnected'); });
//   });


// let currentReviewID = 0;
// for (let i = 1; i < 101; i += 1) {

//   const reviewsArray = [];
//   const numOfRevs = Math.floor(Math.random() * 10);
//   for (let j = 1; j < numOfRevs; j++) {
//     currentReviewID++;
//     reviewsArray.push(currentReviewID);
//     const oneReview = new Review({
//       _review_id: currentReviewID,
//       id_User: Math.floor(Math.random() * 99999 + 1),
//       id_Restaurants: i,
//       date: fake.date.between('2000-01-10', '2020-01-21'),
//       rating: Math.floor(Math.random() * 4 + 1),
//       body: fake.lorem.sentences(20),
//       useful_count: Math.floor(Math.random() * 8 + 1),
//       cool_count: Math.floor(Math.random() * 5 + 1),
//       funny_count: Math.floor(Math.random() * 2 + 1),
//       check_ins: Math.floor(Math.random() * 3),
//     });
//     oneReview.save((err, review) => {
//       if (err) { console.log(err); }
//       console.log('added review: ', review._review_id);
//     });
//   }

//   const oneRestaurant = new Restaurant({
//     _id: i,
//     name: fake.company.companyName(),
//     reviews: reviewsArray,
//   });
//   oneRestaurant.save((err, restaurant) => {
//     if (err) { return console.log(err); }
//     console.log('added: ', restaurant.name);
//   });
// }
