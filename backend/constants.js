const regexUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
];

module.exports = {
  regexUrl, allowedCors,
};
