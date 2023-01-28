const regexUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://localhost:3000',
  'http://localhost:3000',
  'http://51.250.25.171:3000',
  'https://milchess.nomoredomainsclub.ru',
  'http://milchess.nomoredomainsclub.ru',
  'https://api.milchess.nomoredomainsclub.ru',
  'http://api.milchess.nomoredomainsclub.ru',
  'localhost:3000',
];

module.exports = {
  regexUrl, allowedCors,
};
