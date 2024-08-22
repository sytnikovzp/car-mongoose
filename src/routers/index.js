const { Router } = require('express');
// ============================
const carRouter = require('./carsRouter');
const typeRouter = require('./typesRouter');

const router = new Router();

router.use('/cars', carRouter);
router.use('/types', typeRouter);

module.exports = router;
