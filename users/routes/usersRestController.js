const express = require("express");
const router = express.Router();
const { handleError } = require("../../utils/errorHandler");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
} = require("../models/usersAccessData");
const {
  validateRegistration,
  validateLogin,
} = require("../validations/userValidationService");
const normalizeUser = require("../helpers/normalizeUser");
const auth = require("../../auth/authService");
const generateBizNumber = require("../../cards/helpers/generateBizNumber");

router.post("/", async (req, res) => {
  try {
    let user = req.body;

    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    console.log(user);
    user = await normalizeUser(user);
    user = await registerUser(user);
    return res.send(user).status(201);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    const user = await loginUser(req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin user to see all users in the database"
      );
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    const { status } = error;
    return handleError(res, status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { _id, isAdmin } = req.user;
    const { id } = req.params;
    if (_id !== id && !isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registrated user to see this user"
      );
    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    const { status } = error;
    return handleError(res, status || 500, error.message);
  }
});

router.use((req, res) => handleError(res, 404, "Page not found in users"));

module.exports = router;
