require('dotenv').config();
const express = require('express');

const dbMongo = require('./src/models');
const { cars, types } = require('./src/constants');
const router = require('./src/routers');

const { Car, Type } = dbMongo;

const app = express();

app.use(express.json());

app.use('/api', router);

const createCars = async () => {
  await Car.create(cars);
};

// createCars()

const createTypes = async () => {
  await Type.create(types);
};

// createTypes()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
