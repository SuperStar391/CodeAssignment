var express = require("express");
var router = express.Router();

var transactionController = require("../controllers/transactionController");

router.route('/add').post(transactionController.add);
router.route('/get').get(transactionController.get);

module.exports = router;
