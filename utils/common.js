const fs = require('fs');

const readDatabases = (dataBaseName, cb) => {
  fs.readFile(`./dataBase/${dataBaseName}.json`, {}, (err, data) => {
    if (err) throw err;
    cb(data.toString() ? [...JSON.parse(data.toString())] : []);
  });
};

const writeDatabases = (dataBaseName, data, cb) => {
  fs.writeFile(
    `./dataBase/${dataBaseName}.json`,
    JSON.stringify(data),
    "utf-8",
    (err) => {
      if (err) throw err;
      cb();
    }
  );
};

createResponse = (data, message, errorCode) => {
  return {
    data,
    message,
    error: errorCode
  }
}

module.exports = {
  readDatabases,
  writeDatabases,
  createResponse,
};
