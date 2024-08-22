const yup = require('yup');

const {
  NEW_CAR_VALIDATION_SCHEMA,
  CAR_PATCH_VALIDATION_SCHEMA,
  NEW_TYPE_VALIDATION_SCHEMA,
  TYPE_PATCH_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

const validateSchema = (schema) => async (req, res, next) => {
  const { body } = req;
  try {
    await schema.validate(body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    console.log(error.errors);
    next(error);
  }
};

module.exports = {
  validateCar: validateSchema(NEW_CAR_VALIDATION_SCHEMA),
  validatePatchCar: validateSchema(CAR_PATCH_VALIDATION_SCHEMA),
  validateType: validateSchema(NEW_TYPE_VALIDATION_SCHEMA),
  validatePatchType: validateSchema(TYPE_PATCH_VALIDATION_SCHEMA),
};
