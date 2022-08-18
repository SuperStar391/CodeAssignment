require("dotenv").config();
const Transaction = require("../models/transaction");

exports.add = async function (req, res, next) {
  Transaction.create(req.body)
    .then((t) => {
      res.status(200).json({
        success: true,
        message: "Transaction added successfully",
      });
    })
    .catch(next);
};

exports.get = async function (req, res, next) {
  Transaction.find()
    .then((list) => {
      res.status(200).json({
        success: true,
        data: list,
      });
    })
    .catch(next);
};
