const mongoose = require('mongoose');
const fake = require('faker');

const restaurantSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },
  name: String,
  reviews: [{
    _review_id: { type: Number, unique: true },
    id_user: Number,
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
    user: {
      _user_id: { type: Number, unique: true },
      name: String,
      profile_pic: String,
      reviews: Number,
      friends: Number,
      photos: Number,
      location: String,
    }
  }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('connected'); })
  .then(() => {
    console.log('connected');
  });

getReviews = (req, res, restaurant, sort) => {
  let reviews = [];
  Restaurant.find({_id: 1}, (err, restaurants) => {
    if (err) return console.error(err);
    else {
      reviews = restaurants[0].reviews;
      res.send(reviews);
    }
  })
}

module.exports = {
  db,
  getReviews,
}