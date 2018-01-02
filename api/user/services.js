const model = require('./model');

module.exports = {
  getAll: () => model.find({}).exec(),
  getOneById: ({ id }) => model.findById(id).exec(),
};
