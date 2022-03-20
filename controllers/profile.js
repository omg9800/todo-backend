const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../helpers/response");

const User = require("../models/user");

module.exports.getProfile = async (req, res) => {
  const userId = req.app.locals.userId;
  try {
    const user = await User.findOne({ _id: userId }).select(
      "givenName photoUrl -_id"
    );
    res.send(generateSuccess(user));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e));
  }
};
