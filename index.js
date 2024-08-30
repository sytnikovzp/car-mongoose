require('dotenv').config();
// ================================
const app = require('./src/app');
const dbMongo = require('./src/models');
const { cars, types } = require('./src/constants');

const { Car, Type } = dbMongo;

const createTypes = async () => {
  await Type.create(types);
  console.log('Types created successfully!');
};

// createTypes()

const createCars = async () => {
  await Car.create(cars);
  console.log('Cars created successfully!');
};

// createCars()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
