// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from './databases.js';

// Using Promise
function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  if (typeof id !== 'number' || id < 1 || id > 10) {
    return Promise.reject(new Error('Invalid ID provided.'));
  }

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
    .catch((error) => {
      return Promise.reject(error);
    });
}

getUserData(3).then(console.log).catch(console.error);
getUserData(5).then(console.log).catch(console.error);
getUserData(0).then(console.log).catch(console.error);

// Using async/await
async function getAsyncUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  if (typeof id !== 'number' || id < 1 || id > 10) {
    return Promise.reject(new Error('Invalid ID provided.'));
  }

  try {
    const databaseID = await central(id);
    const database = dbs[databaseID];

    const [basicInfo, personalInfo] = await Promise.all([
      database(id),
      vault(id),
    ]);

    return {
      id,
      ...basicInfo,
      ...personalInfo,
    };
  } catch (error) {
    return Promise.reject(error);
  }
}

getAsyncUserData(4).then(console.log).catch(console.error);
getAsyncUserData(6).then(console.log).catch(console.error);
getAsyncUserData(11).then(console.log).catch(console.error);
