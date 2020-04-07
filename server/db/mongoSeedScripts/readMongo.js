const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  _id: { type: Number, unique: true },
  name: String,
  reviews: [{
    _id: Number,
    _review_id: { type: Number, unique: true },
    id_user: Number,
    id_restaurants: Number,
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
  }],
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

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/squawk', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log('connected'); })
  .then(() => {
    Restaurant.find({_id: 100000}, {_id:0, reviews:1}, (err, restaurant) => {
      if (err) return console.error(err);
      else {
        restaurant.forEach(review => {
          console.log(review);
        });
      }
    });
  });
