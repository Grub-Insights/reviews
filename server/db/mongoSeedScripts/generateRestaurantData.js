const fake = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generateRestaurantData = () => {
  const csvWriter = createCsvWriter({
    path: 'server/db/seededResults/restaurantData.csv',
    header: [
      { id: '_id', title: '_id' },
      { id: 'name', title: 'name' },
      { id: 'reviews', title: 'reviews' },
    ],
  });
  const allRestaurantObjects = [];
  let currentReviewID = 0;
  for (let i = 1; i <= 100000; i += 1) {
    const reviewsArray = [];
    const numOfRevs = Math.floor(Math.random() * 300);
    for (let j = 1; j < numOfRevs; j += 1) {
      currentReviewID += 1;
      reviewsArray.push(currentReviewID);
    }
    allRestaurantObjects.push({
      _id: i,
      name: fake.company.companyName(),
      reviews: reviewsArray,
    });
    if (i % 1000 === 0) {
      console.log(`${i / 100000} completed`);
    }
  }
  csvWriter.writeRecords(allRestaurantObjects)
    .then(() => {
      console.log('...Done with restaurants');
    });
};

generateRestaurantData();
