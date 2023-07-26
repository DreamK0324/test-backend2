const mongoose = require('mongoose');
const { url } = require('../utils/configDB');
const { User, Movie } = require('../models');



const seedDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to DB for seed');

    // Clear existing data from the collections
    await User.deleteMany({});
    await Movie.deleteMany({});

    // Create dummy users
    const dummyUser1 = await User.create({
      firstname: 'Jay',
      lastname: 'Chou',
      email: 'test1@gmail.com',
    });

    const dummyUser2 = await User.create({
      firstname: 'Edison',
      lastname: 'Chen',
      email: 'test2@gmail.com',
    });

    const dummyUser3 = await User.create({
      firstname: 'A',
      lastname: 'A',
      email: 'test3@gmail.com',
    });

    const dummyUser4 = await User.create({
      firstname: 'B',
      lastname: 'B',
      email: 'test4@gmail.com',
    });

    // Create dummy movies
    const dummyMovie1 = await Movie.create({
      title: 'Initial D',
      releaseDate: new Date('2005-01-01'),
      rate: 7.9,
    });

    const dummyMovie2 = await Movie.create({
      title: 'Movie A',
      releaseDate: new Date('2000-01-01'),
      rate: 6.0,
    });

    const dummyMovie3 = await Movie.create({
      title: 'Movie B',
      releaseDate: new Date('2000-01-01'),
      rate: 6.0,
    });

    // Set users for the movies
    dummyMovie1.userId = dummyUser1._id;
    dummyMovie2.userId = dummyUser3._id;

    await dummyMovie1.save();
    await dummyMovie2.save();

    // Update the user's movies array
    dummyUser1.movies.push(dummyMovie1._id);
    dummyUser3.movies.push(dummyMovie2._id, dummyMovie3._id);

    await dummyUser1.save();
    await dummyUser3.save();

    console.log('Data inserted successfully');

    
  } catch (err) {
    console.error('Error seeding data:', err);
  }

};

module.exports = seedDB;
