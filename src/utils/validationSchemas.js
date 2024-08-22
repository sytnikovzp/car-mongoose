const yup = require('yup');

// ==================== GENERAL ============================
const STRING_SCHEMA = yup.string();
const STRING_NULLABLE_SCHEMA = yup.string().nullable();
const DATE_NULLABLE_SCHENA = yup.date().nullable();
const BOOLEAN_NULLABLE_SCHEMA = yup.boolean().nullable();

const PAGINATION_SCHEMA = yup.object().shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});

// ==================== FOR ENTITIES =======================

const NEW_CAR_VALIDATION_SCHEMA = yup.object().shape({
  brand: STRING_SCHEMA.required(),
  model: STRING_SCHEMA.required(),
  year: DATE_NULLABLE_SCHENA,
  color: STRING_NULLABLE_SCHEMA,
  engine_type: STRING_NULLABLE_SCHEMA,
  bodywork_type: STRING_NULLABLE_SCHEMA,
  gear_type: STRING_NULLABLE_SCHEMA,
  new: BOOLEAN_NULLABLE_SCHEMA,
  logo: STRING_NULLABLE_SCHEMA,
  typeId: STRING_NULLABLE_SCHEMA,
});

const CAR_PATCH_VALIDATION_SCHEMA = yup.object().shape({
  brand: STRING_SCHEMA,
  model: STRING_SCHEMA,
  year: DATE_NULLABLE_SCHENA,
  color: STRING_NULLABLE_SCHEMA,
  engine_type: STRING_NULLABLE_SCHEMA,
  bodywork_type: STRING_NULLABLE_SCHEMA,
  gear_type: STRING_NULLABLE_SCHEMA,
  new: BOOLEAN_NULLABLE_SCHEMA,
  logo: STRING_NULLABLE_SCHEMA,
  typeId: STRING_NULLABLE_SCHEMA,
});

const NEW_TYPE_VALIDATION_SCHEMA = yup.object().shape({
  type: STRING_SCHEMA.required(),
});

const TYPE_PATCH_VALIDATION_SCHEMA = yup.object().shape({
  type: STRING_SCHEMA,
});

module.exports = {
  PAGINATION_SCHEMA,
  NEW_CAR_VALIDATION_SCHEMA,
  CAR_PATCH_VALIDATION_SCHEMA,
  NEW_TYPE_VALIDATION_SCHEMA,
  TYPE_PATCH_VALIDATION_SCHEMA,
};
