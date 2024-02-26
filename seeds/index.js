const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors}  = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
main().catch(err => console.log(err)); 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const db= mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.on('close', () => {
    console.log('MongoDB connection closed');
  });
const sample = array => array[Math.floor(Math.random()*array.length)]
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i <70; i++) {
      const random1000 = Math.floor(Math.random() * 29);
      const price = Math.floor(Math.random() * 20) + 10;
      const camp = new Campground({
          author: '65c53252248607feb450801d',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          geometry: {
            type: "Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
        },
        images: [
          {
            url: 'https://res.cloudinary.com/djacssput/image/upload/v1708858981/YelpCamp/anjrppzsierv4puupgf9.jpg',
            filename: 'YelpCamp/anjrppzsierv4puupgf9',
  
          },
          {
            url: 'https://res.cloudinary.com/djacssput/image/upload/v1708858920/YelpCamp/ormgwxmoqi9vrahceaqv.jpg',
            filename: 'YelpCamp/ormgwxmoqi9vrahceaqv',
          }
      ],
          description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
          price
      })
      await camp.save();
  }
}
seedDB();
 








  