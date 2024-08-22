const { Router } = require('express');
// ============================
const CarController = require('../controllers/carController');
const {
  paginate: { paginate },
  validate: { validateCar, validatePatchCar },
  upload: { uploadLogos },
} = require('../middlewares');
// ============================

const router = new Router();

router
  .route('/')
  .get(paginate, CarController.getAllCars)
  .post(uploadLogos.single('logo'), validateCar, CarController.createCar);

router.get('/by-brand', CarController.getCarByBrand);
router.get('/by-color', CarController.getCarByColor);

router
  .route('/:id')
  .get(CarController.getCarById)
  .patch(uploadLogos.single('logo'), validatePatchCar, CarController.patchCar)
  .delete(CarController.deleteCar);

module.exports = router;
