module.exports = (sequelize, Sequelize) => {
  const userSeque = sequelize.define("userSque", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });

  return userSeque;
};
