const fake = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const generateRestaurantData = () => {
  const csvWriter = createCsvWriter({
    path: 'server/db/seededResults/restaurantDataPG.csv',
    header: [
      { id: '_id', title: '_id' },
      { id: 'name', title: 'name' },
    ],
  });
  const allRestaurantObjects = [];
  for (let i = 1; i <= 100000; i += 1) {
    allRestaurantObjects.push({
      _id: i,
      name: fake.company.companyName(),
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
