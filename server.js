const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { url } = require('./utils/configDB');
const apiRouter = require('./routes');
const { User, Movie } = require('./models'); // Import the User model

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to DB");

    // Function to clear existing data from collections
    const clearData = async () => {
      try {
        await User.deleteMany({});
        await Movie.deleteMany({});
        console.log('Data cleared successfully');
      } catch (err) {
        console.error('Error clearing data:', err);
      }
    };

    // Function to seed the database with dummy data
    const seedDB = require('./utils/seedDB');

    // Call the clearData function to clear existing data
    clearData().then(() => {
            // Call the seedDB function to seed the database with dummy data
            seedDB().then(() => {
            console.log('Database seeded with dummy data');

                        // Rest of your code goes here...
                        //define a route
                        app.get("/hello", (request, response) => {
                        response.send("hello world!");
                        });

                        // Use the apiRouter middleware
                        app.use('/api', apiRouter);

                        const PORT = 5001;
                        app.listen(PORT, console.log(`Server started on ${PORT}`));
                        
            }).catch((error) => {
                console.error('Error seeding database:', error);
                process.exit(1);
            });
    }).catch((error) => {
      console.error('Error clearing data:', error);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
    process.exit(1);
  });
