require('dotenv').config();
const express = require('express');

const dbMongo = require('./src/models');
const { cars, types } = require('./src/constants');
const router = require('./src/routers');

const { Car, Type } = dbMongo;

const app = express();

app.use(express.json());

app.use('/api', router);

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
