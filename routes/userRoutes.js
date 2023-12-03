const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

router.use('/', userMiddleware);

module.exports = router;
