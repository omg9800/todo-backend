const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const User = require("../models/user");
const { generateLog, generateError } = require("../helpers/response");

const errorMessage = "You are not authorized to view this page!";

module.exports = async (req, res, next) => {
  const rawToken = req.headers.authorization;

  if (!rawToken || !rawToken.startsWith("Bearer ")) {
    res.send(generateError(errorMessage));
    return;
  }
  const encodedToken = rawToken.substring(7, rawToken.length);
  let decodedToken;
  try {
    decodedToken = await jwt.verify(encodedToken, SECRET_KEY);
    const { userId } = decodedToken;
    const record = await User.findOne({ _id: userId }).select("tokens -_id");
    if (!record) {
      res.send(generateError(errorMessage));
      return;
    }
    const ifTokenExists = record.tokens.filter(
      (token) => token === encodedToken
    );

    if (ifTokenExists.length == 0) {
      res.send(generateError(errorMessage));
      return;
    }

    req.app.locals.userId = userId;
    req.app.locals.token = encodedToken;
    next();
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
    return;
  }
};
