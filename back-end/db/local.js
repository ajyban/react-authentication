const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, 'local-data.json');

async function findOne(dbName, matchObj) {
  const findPromise = new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, (err, fileData) => {
      if (err) {
        reject(err);
        return;
      }
      const data = fileData.length > 0 ? JSON.parse(fileData) : {};
      const reqKey = Object.keys(matchObj)[0];
      const reqVal = matchObj[reqKey];
      const user = data[dbName]?.find((r) => r[reqKey] === reqVal);
      resolve(user);
    });
  });
  return findPromise;
}

async function insertOne(dbName, record) {
  const insertPromise = new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, (err, fileData) => {
      if (err) {
        reject(err);
        return;
      }
      const data = fileData.length > 0 ? JSON.parse(fileData) : {};
      if (!data[dbName]) {
        data[dbName] = [];
      }
      const newId = `Id_${data[dbName].length + 1}`;
      const newRecord = { ...record, id: newId };
      data[dbName].push(newRecord);
      fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(newRecord);
      });
    });
  });
  return insertPromise;
}

async function findOneAndUpdate(dbName, matchObj, record) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, (err, fileData) => {
      if (err) {
        reject(err);
        return;
      }
      const data = fileData.length > 0 ? JSON.parse(fileData) : {};
      if (!data[dbName]) {
        reject({ message: 'DB not found' });
        return;
      }
      const reqKey = Object.keys(matchObj)[0];
      const reqVal = matchObj[reqKey];
      const user = data[dbName]?.find((r) => r[reqKey] === reqVal);
      for (const key in record) {
        if (Object.prototype.hasOwnProperty.call(record, key)) {
          const element = record[key];
          user[key] = element;
        }
      }
      fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      });
    });
  });
  return promise;
}
const dbObj = {
  findOne: findOne,
  insertOne: insertOne,
  findOneAndUpdate: findOneAndUpdate,
};

module.exports = dbObj;
