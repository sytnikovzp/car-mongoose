const createError = require('http-errors');
const mongoose = require('mongoose');
// ============================
const { Car, Type } = require('../models');

class CarController {
  async getAllCars(req, res, next) {
    try {
      const limit = parseInt(req.pagination.limit);
      const offset = parseInt(req.pagination.offset);

      const cars = await Car.aggregate([
        {
          $lookup: {
            from: 'types',
            localField: 'typeId',
            foreignField: '_id',
            as: 'carType',
          },
        },
        {
          $unwind: '$carType',
        },
        {
          $project: {
            brand: 1,
            model: 1,
            year: 1,
            color: 1,
            engine_type: 1,
            bodywork_type: 1,
            gear_type: 1,
            new: 1,
            logo: 1,
            carType: '$carType.type',
            _id: 1,
          },
        },
        {
          $sort: { brand: 1 },
        },
        {
          $skip: offset,
        },
        {
          $limit: limit,
        },
      ]);

      if (cars.length) {
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

      const car = await Car.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'types',
            localField: 'typeId',
            foreignField: '_id',
            as: 'carType',
          },
        },
        {
          $unwind: '$carType',
        },
        {
          $project: {
            brand: 1,
            model: 1,
            year: 1,
            color: 1,
            engine_type: 1,
            bodywork_type: 1,
            gear_type: 1,
            new: 1,
            logo: 1,
            carType: '$carType.type',
            _id: 0,
          },
        },
      ]);

      if (car.length) {
        res.status(200).json(car[0]);
      } else {
        console.log('Car has not been found');
        next(createError(404, 'Car has not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getCarByBrand(req, res, next) {
    try {
      const { brand } = req.query;

      if (!brand) {
        return next(createError(400, 'Brand parameter is required'));
      }

      const carByBrand = await Car.aggregate([
        {
          $match: { brand: { $regex: new RegExp(brand, 'i') } },
        },
        {
          $lookup: {
            from: 'types',
            localField: 'typeId',
            foreignField: '_id',
            as: 'carType',
          },
        },
        {
          $unwind: '$carType',
        },
        {
          $project: {
            brand: 1,
            model: 1,
            year: 1,
            color: 1,
            engine_type: 1,
            bodywork_type: 1,
            gear_type: 1,
            new: 1,
            logo: 1,
            carType: '$carType.type',
            _id: 1,
          },
        },
      ]);

      if (carByBrand.length > 0) {
        res.status(200).json(carByBrand);
      } else {
        console.log('No cars found');
        next(createError(404, 'No cars found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getCarByColor(req, res, next) {
    try {
      const { color } = req.query;

      if (!color) {
        return next(createError(400, 'Color parameter is required'));
      }

      const carByColor = await Car.aggregate([
        {
          $match: { color: { $regex: new RegExp(color, 'i') } },
        },
        {
          $lookup: {
            from: 'types',
            localField: 'typeId',
            foreignField: '_id',
            as: 'carType',
          },
        },
        {
          $unwind: '$carType',
        },
        {
          $project: {
            brand: 1,
            model: 1,
            year: 1,
            color: 1,
            engine_type: 1,
            bodywork_type: 1,
            gear_type: 1,
            new: 1,
            logo: 1,
            carType: '$carType.type',
            _id: 1,
          },
        },
      ]);

      console.log(carByColor);

      if (carByColor.length > 0) {
        res.status(200).json(carByColor);
      } else {
        console.log('No cars found');
        next(createError(404, 'No cars found'));
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
