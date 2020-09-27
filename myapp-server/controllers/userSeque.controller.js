const db = require("../models/sequelizeModel");
const UserSeque = db.userSeque;
const Op = db.Sequelize.Op;

const { getDataIndex } = require("../utils/index");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: userSeques } = data;
  console.log(userSeques);
  const first = userSeques.length ? userSeques[0]["dataValues"] : {};
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    code: 200000,
    data: {
      list: userSeques,
      title: getDataIndex(first, []),
      totalItems,
      totalPages,
      currentPage,
    },
  };
};
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a UserSeques
  const userSeques = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save UserSeques in the database
  UserSeque.create(userSeques)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
// Retrieve all UserSeques from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  UserSeque.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserSeques.",
      });
    });
};

// find all published UserSeque
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  UserSeque.findAndCountAll({ where: { published: true }, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserSeques.",
      });
    });
};
