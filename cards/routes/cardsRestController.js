//this module responsible for end-points of cards.

const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { handleError } = require("../../utils/errorHandler");
const {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  getCard,
  getMyCards,
  updateCard,
} = require("../models/cardsAccessData");
const validateCard = require("../validations/cardValidationService");
const normalizeCard = require("../helpers/normalizeCard");
const auth = require("../../auth/authService");

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/my-cards", async (req, res) => {
  try {
    const userId = "64a427e9ab86172a65ab5ef4";
    const cards = await getMyCards(userId);
    return res.send(cards);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCard(id);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { isBusiness, isAdmin } = req.user;
    if (!isBusiness || !isAdmin)
      return handleError(
        res,
        403,
        "Forbidden request: Only business user or admin can create business card."
      );

    let card = req.body;
    const { error } = validateCard(card);

    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(req.body);
    card = await createCard(card);
    return res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cardId = req.params;
    let card = req.body;

    if (userId !== cardId)
      return handleError(
        res,
        403,
        "Access Error: Only the user who created the card can update it."
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    card = await normalizeCard(card);
    card = await updateCard(cardId, card);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params;
    const userId = req.user._id;

    if (!userId)
      return handleError(
        res,
        403,
        "Authorization Error: Only registrated users can like business cards."
      );

    const card = await likeCard(cardId, userId);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params;
    const user = req.user;

    const card = await deleteCard(cardId, user);
    return res.send(card);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
