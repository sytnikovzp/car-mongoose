const path = require('path');
// ================================
require('dotenv').config();
const mongoose = require('mongoose');
// ================================
const app = require('./src/app');
const dbMongo = require('./src/models');
const { cars, types } = require('./src/constants');
// ==========================
const env = process.env.NODE_ENV || 'development';
const pathToConfig = path.resolve('src', 'config', 'mongoConfig');

const config = require(pathToConfig)[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.dbName}`)
  .then(() =>
    console.log(`Connection to DB < ${config.dbName} > successfully!`)
  )
  .catch((err) => console.log(err));

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
