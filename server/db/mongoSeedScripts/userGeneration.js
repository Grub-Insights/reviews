const fake = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { profileImg } = require('../profileImages');

// edit headers depending on whether you're importing to mongo vs postgres
const generateUserData = () => {
  const csvWriter = createCsvWriter({
    path: 'server/db/seededResults/userData.csv',
    header: [
      { id: '_user_id', title: '_user_id' },
      { id: 'name', title: 'name' },
      { id: 'profile_pic', title: 'profile_pic' },
      { id: 'reviews', title: 'reviews' },
      { id: 'friends', title: 'friends' },
      { id: 'photos', title: 'photos' },
      { id: 'location', title: 'location' },
    ],
  });
  const allUserObjects = [];
  for (let i = 1; i <= 100000; i += 1) {
    allUserObjects.push({
      _user_id: i,
      name: `${fake.name.firstName()} ${fake.name.lastName()[0]}`,
      profile_pic: profileImg[i % 19],
      reviews: Math.floor(Math.random() * 950 + 50),
      friends: Math.floor(Math.random() * 950 + 50),
      photos: Math.floor(Math.random() * 950 + 50),
      location: `${fake.address.city()}, ${fake.address.stateAbbr()}`,
    });
  }
  csvWriter.writeRecords(allUserObjects)
    .then(() => {
      console.log('...Done with users');
    });
};

generateUserData();
