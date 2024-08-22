const createError = require('http-errors');
// ==========================
const { Type } = require('../models');

class TypeController {
  async getAllTypes(req, res, next) {
    try {
      const types = await Type.find(
        {},
        {
          type: 1,
          _id: 0,
        }
      ).sort({ type: 1 });

      if (types) {
        // console.log(`Types are: ${JSON.stringify(types, null, 2)}`);
        res.status(200).json(types);
      } else {
        console.log('Any types have not been found');
        next(createError(404, 'Any types have not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async getTypeById(req, res, next) {
    try {
      const { id } = req.params;
      const type = await Type.findById(id, 'type -_id');

      if (type) {
        // console.log(`Type is: ${JSON.stringify(type, null, 2)}`);
        res.status(200).json(type);
      } else {
        console.log('Type has not been found');
        next(createError(404, 'Type has not been found'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async createType(req, res, next) {
    const { body } = req;
    try {
      const createdType = new Type(body);
      const savedType = await createdType.save();

      if (savedType) {
        console.log('Type created successfuly');
        res.status(200).json(savedType);
      } else {
        console.log('Can not create type');
        next(createError(404, 'Can not create type'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  async patchType(req, res, next) {
    try {
      const {
        params: { id },
        body,
      } = req;

      const updatedType = await Type.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true, runValidators: true }
      ).exec();

      if (updatedType) {
        console.log(`Type with id ${id} has been modified`);
        res.status(200).json(updatedType);
      } else {
        console.log('Cannot update type!');
        next(createError(400, 'Cannot update type!'));
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  deleteType = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedType = await Type.findByIdAndDelete(id);

      if (!deletedType) {
        return next(createError(404, 'Type not found!'));
      }

      res.sendStatus(res.statusCode);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  };
}

module.exports = new TypeController();
