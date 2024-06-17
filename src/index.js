// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from './databases.js';

// Using Promise
function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  return central(id)
    .then((db) => {
      const database = dbs[db];
      return Promise.all([database(id), vault(id)]);
    })
    .then(([basicInfo, personalInfo]) => ({
      id,
      ...basicInfo,
      ...personalInfo,
    }))
    .catch(() => {
      throw new Error('User not found');
    });
}

getUserData(3).then(console.log).catch(console.error);
getUserData(5).then(console.log).catch(console.error);
getUserData(0).then(console.log).catch(console.error);
