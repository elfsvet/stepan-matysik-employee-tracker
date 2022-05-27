const express = require('express');
const router = express.Router();

// import the routes for now to test
router.use(require('./departmentRoutes'));
router.use(require('./employeeRoutes'));
// router.use(require('./managerRoutes'));
router.use(require('./roleRoutes'));

module.exports = router;