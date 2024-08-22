const path = require('path');
const fs = require('fs');
// ==========================
const mongoose = require('mongoose');
// ==========================
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(__filename);
const pathToConfig = path.resolve('src', 'config', 'mongoConfig');

const config = require(pathToConfig)[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.dbName}`)
  .then(() => console.log(`Connection to DB <<< ${config.dbName} >>> is done`))
  .catch((err) => console.log(err));

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
