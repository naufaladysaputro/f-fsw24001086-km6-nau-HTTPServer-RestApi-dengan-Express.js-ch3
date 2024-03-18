const express = require("express");
const fs = require("fs");

// read file JSON
const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/dummy_data.json`)
);

const getCarsData = (req, res, next) => {
  res.status(200).json({
    status: "succes",
    totaldata: cars.length,
    requestAt: req.requestTime,
    data: {
      cars,
    },
  });
};

// mengambil data
const getCarsDataById = (req, res, next) => {
  const id = req.params.id;

  // menggunakan array method utk membantu menemukan spesifik data
  const car = cars.find((cust) => cust.id === id);

  // shortcut memanggil objek
  // cont (id, name, date) = req.params;
  // console.log(id);

  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Id : ${id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      car,
    },
  });
};

// update data
const updateCars = (req, res) => {
  const id = req.params.id;

  // 1.melakukan pencarian data
  const car = cars.find((cust) => cust.id === id);
  const carIndex = cars.findIndex((cust) => cust.id === id);

  // 2. ada gak datanya
  if (!car) {
    return res.status(404).JSON({
      status: "fail",
      message: `custommer dengan ID : ${id} gak ada`,
    });
  }

  // 3. kalau ada, berarti update datanya sesuai reques body dari user
  // object assign = menggabungkan object or spread operator

  cars[carIndex] = { ...cars[carIndex], ...req.body };

  // 4. melakukan update di dokumennya
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "succes",
        message: "berhasil",
        data: {
          car: cars[carIndex],
          car,
        },
      });
    }
  );
};

// menghapus data
const deleteData = (req, res) => {
  const id = req.params.id;
  // 1.melakukan pencarian data
  const car = cars.find((cust) => cust.id === id);
  const carIndex = cars.findIndex((cust) => cust.id === id);

  // 2. ada gak datanya
  if (!car) {
    return res.status(404).json({
      status: "fail",
      message: `Id : ${id} tidak ditemukan`,
    });
  }

  // 3. kalau ada, berarti delete datanya sesuai reques body dari user
  // object assign = menggabungkan object or spread operator

  // cars[carIndex] = {...cars[carIndex], ...req.body}
  cars.splice(carIndex, 1);

  // 4. melakukan update di dokumennya
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(200).json({
        status: "succes",
        message: "data delete",
      });
    }
  );
};

// menambahkan data
const createCars = (req, res) => {
  const newCar = req.body;
  cars.push(req.body);
  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(cars),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          cars: newCar,
        },
      });
    }
  );
};

module.exports = {
  getCarsData,
  updateCars,
  getCarsDataById,
  createCars,
  deleteData,
};