const { api } = require('./axios.service');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    api('GET', `users`, 'token', '', '')
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const createNewUser = (reqBody) => {
  return new Promise((resolve, reject) => {
    api('POST', `users`, 'token', reqBody, '')
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { getAllUsers, createNewUser };
