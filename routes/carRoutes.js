const express = require("express");
const fs = require('fs')

const router = express.Router();

const carController = require("../controllers/carController")

router
.route("/")
.get(carController.getCarsData)
.post(carController.createCars);

router
  .route("/:id")
  .get(carController.getCarsDataById)
  .put(carController.updateCars)
  .delete(carController.deleteData);

module.exports = router;