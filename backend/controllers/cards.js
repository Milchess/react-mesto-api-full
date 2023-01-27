const Card = require('../models/card');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const card = await Card.create({
      owner: req.user._id, ...req.body,
    });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      next(new NotFound('Карточка с указанным id не найдена'));
    } else {
      const cardOwner = card.owner._id.toString();
      if (cardOwner === req.user._id) {
        await card.remove();
        res.send({ message: 'Карточка удалена' });
      } else {
        next(new Forbidden('Нельзя удалять карточку созданную не вами'));
      }
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFound('Карточка с указанным id не найдена'));
    } else {
      res.send({ message: 'Лайк карточке поставлен' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      next(new NotFound('Карточка с указанным id не найдена'));
    } else {
      res.send({ message: 'Лайк удален у карточки' });
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неккоректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
