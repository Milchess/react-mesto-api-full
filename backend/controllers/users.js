const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Authorization = require('../errors/authorization');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/badRequest');
const Conflict = require('../errors/conflict');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      next(new NotFound('Пользователь с указанным id не найден'));
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else if (err.code === 11000) {
      next(new Conflict('Данный пользователь уже существует'));
    } else {
      next(err);
    }
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, { new: true, runValidators: true });
    if (!user) {
      next(new NotFound('Пользователь с указанным id не найден'));
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, { new: true, runValidators: true });
    if (!user) {
      next(new NotFound('Пользователь с указанным id не найден'));
    } else {
      res.send(user);
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new Authorization('Пользователь не найден'));
    }

    const isUserValid = await bcrypt.compare(password, user.password);
    if (isUserValid) {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });

      res.send({ token });
    }
    next(new Authorization('Неверный логин или пароль'));
  } catch (err) {
    next(err);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login, getUserInfo,
};
