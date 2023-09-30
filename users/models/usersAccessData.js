const {
  generateUserPassword,
  comparePassword,
} = require("../../cards/helpers/bcrypt");
const { handleBadRequest } = require("../../utils/errorHandler");
const User = require("./mongodb/User");
const lodash = require("lodash");
const config = require("config");
const { generateAuthToken } = require("../../auth/Providers/jwt");

const DB = config.get("DB");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;

      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user.password = generateUserPassword(user.password);
      user = await user.save();

      user = lodash.pick(user, ["_id", "name", "email"]);
      return Promise.resolve(user);
    } catch (error) {
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("register not in mongodb");
};

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid email or password");

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid email or password");

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve({});
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
