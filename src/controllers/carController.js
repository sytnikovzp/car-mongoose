const createError = require('http-errors');
// ============================
const { Car, Type } = require('../models');

class CarController {
  async getAllCars(req, res, next) {
    try {
      const { limit, offset } = req.pagination;
      const cars = await Car.find(
        {},
        {
          brand: 1,
          model: 1,
          year: 1,
          color: 1,
          engine_type: 1,
          bodywork_type: 1,
          gear_type: 1,
          new: 1,
          logo: 1,
          _id: 0,
        }
      )
        .sort({ brand: 1 })
        .limit(limit)
        .skip(offset);

      if (cars) {
        // console.log(`Cars are: ${JSON.stringify(cars, null, 2)}`);
        res.status(200).json(cars);
      } else {
        console.log('Any cars have not been found');
        next(createError(404, 'Any cars have not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getCarById(req, res, next) {
    try {
      const { id } = req.params;
      const car = await Car.findById(
        id,
        'brand model year color engine_type bodywork_type gear_type new logo -_id'
      );

      if (car) {
        // console.log(`Car is: ${JSON.stringify(car, null, 2)}`);
        res.status(200).json(car);
      } else {
        console.log('Car has not been found');
        next(createError(404, 'Car has not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  createCar = async (req, res, next) => {
    try {
      const { body, file } = req;
      const logo = file ? file.filename : null;
      const type = await Type.findOne({ type: body.type });

      if (!type) {
        return next(createError(404, 'Type is not found!'));
      }

      const newCar = new Car({
        ...body,
        logo,
        typeId: type._id,
      });

      if (!newCar) {
        return next(createError(404, 'Car is not created!'));
      }

      const savedCar = await newCar.save();
      res.status(201).json(savedCar);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

  patchCar = async (req, res, next) => {
    try {
      const {
        params: { id },
        body,
        file,
      } = req;

      if (file) {
        body.logo = file.filename;
      }

      if (body.type) {
        const type = await Type.findOne({ type: body.type });

        if (!type) {
          return next(createError(404, 'Type not found!'));
        }

        body.typeId = type._id;
      }

      const updatedCar = await Car.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      ).populate('typeId');

      if (!updatedCar) {
        return next(createError(404, 'Car not found!'));
      }

      const carData = {
        ...updatedCar.toObject(),
        type: updatedCar.typeId.type,
        typeId: undefined,
      };

      res.status(200).json(carData);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };

  deleteCar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCar = await Car.findByIdAndDelete(id);

      if (!deletedCar) {
        return next(createError(404, 'Car not found!'));
      }

      res.sendStatus(res.statusCode);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
}

module.exports = new CarController();
