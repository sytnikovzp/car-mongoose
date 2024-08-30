const { Router } = require('express');
// ============================
const typeController = require('../controllers/typeController');
const {
  validate: { validateType, validatePatchType },
} = require('../middlewares');
// ============================

const router = new Router();

router
  .route('/')
  .get(typeController.getAllTypes)
  .post(validateType, typeController.createType);

router
  .route('/:id')
  .get(typeController.getTypeById)
  .patch(validatePatchType, typeController.patchType)
  .delete(typeController.deleteType);

module.exports = router;
