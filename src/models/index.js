const path = require('path');
const fs = require('fs');
// ==========================
const mongoose = require('mongoose');
const basename = path.basename(__filename);

const dbMongo = {};

fs.readdirSync(__dirname)
  .filter((fileName) => {
    return (
      fileName.indexOf('.') !== 0 &&
      fileName !== basename &&
      fileName.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    dbMongo[model.modelName] = model;
  });

dbMongo.mongoose = mongoose;

module.exports = dbMongo;
