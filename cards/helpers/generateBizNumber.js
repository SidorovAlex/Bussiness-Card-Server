const lodash = require("lodash");
const Card = require("../models/mongodb/Card");
const { handleBadRequest } = require("../../utils/errorHandler");

const generateBizNumber = async () => {
  try {
    const random = lodash.random(1_000_000, 9_000_000);
    const card = Card.findOne({ bizNumber: random }, { bizNumber: 1, _id: 0 });
    if (card) return generateBizNumber();
    return random;
  } catch (error) {
    return handleBadRequest("GenerateBizNumber", error);
  }
};
module.exports = generateBizNumber;
