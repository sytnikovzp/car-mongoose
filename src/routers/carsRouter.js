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
  .get(paginate, carController.getAllCars)
  .post(uploadLogos.single('logo'), validateCar, carController.createCar);

router.get('/by-brand', carController.getCarByBrand);
router.get('/by-color', carController.getCarByColor);

router
  .route('/:id')
  .get(carController.getCarById)
  .patch(uploadLogos.single('logo'), validatePatchCar, carController.patchCar)
  .delete(carController.deleteCar);

module.exports = router;
