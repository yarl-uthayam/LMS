const { api } = require('./axios.service');

const getAllBooks = (searchTerm) => {
  return new Promise((resolve, reject) => {
    api('GET', `books?searchTerm=${searchTerm}`, 'token', '', '')
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createBook = (reqBody) => {
  return new Promise((resolve, reject) => {
    api('POST', `books`, 'token', reqBody, '')
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateBook = (reqBody, id) => {
  return new Promise((resolve, reject) => {
    api('PUT', `books`, 'token', reqBody, id)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export { getAllBooks, createBook, updateBook };
