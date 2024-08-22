const { Router } = require('express');
// ============================
const carController = require('../controllers/carController');
const {
  paginate: { paginate },
  validate: { validateCar, validatePatchCar },
  upload: { uploadLogos },
} = require('../middlewares');

// ============================

const router = new Router();

router
  .route('/')
  // .get(paginate, carController.getCars)
  // .post(uploadLogos, validateCar, carController.createCar)
  // .put(uploadLogos, validateCar, carController.updateCar);

router
  .route('/:id')
  // .get(carController.getCarById)
  // .patch(uploadLogos, validatePatchCar, carController.patchCar)
  // .delete(carController.deleteCar);

module.exports = router;
