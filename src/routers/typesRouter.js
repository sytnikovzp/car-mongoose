const { Router } = require('express');
// ============================
const TypeController = require('../controllers/typeController');
const {
  validate: { validateType, validatePatchType },
} = require('../middlewares');
// ============================

const router = new Router();

router
  .route('/')
  .get(TypeController.getAllTypes)
  .post(validateType, TypeController.createType);

router
  .route('/:id')
  .get(TypeController.getTypeById)
  .patch(validatePatchType, TypeController.patchType)
  .delete(TypeController.deleteType);

module.exports = router;
