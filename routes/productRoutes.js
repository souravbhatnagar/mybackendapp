const express = require('express');
const productMiddleware = require('../middleware/productMiddleware');

const router = express.Router();

router.use('/', productMiddleware);

module.exports = router;
