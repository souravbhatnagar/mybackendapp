const express = require('express');
const hikeMiddleware = require('../middleware/hikeMiddleware');

const router = express.Router();

router.use('/', hikeMiddleware);

module.exports = router;
