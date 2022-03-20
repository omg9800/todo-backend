const {
  generateSuccess,
  generateLog,
  generateError,
} = require("../helpers/response");

const User = require("../models/user");
const uniqueString = toString(new Date());

module.exports.createTodo = async (req, res) => {
  const userId = req.app.locals.userId;
  const text = req.body.text;
  let todoId = uniqueString;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          todos: { todoId, text },
        },
      }
    );
    res.send(generateSuccess("Todo created!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};

module.exports.editTodo = async (req, res) => {
  const userId = req.app.locals.userId;
  const todoId = req.params.todoId;
  const text = req.body.text;
  try {
    await User.updateOne(
      { _id: userId, "todos.todoId": todoId },
      {
        $set: {
          "todos.$.text": text,
        },
      }
    );
    res.send(generateSuccess("Todo edited!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};

module.exports.deleteTodo = async (req, res) => {
  const userId = req.app.locals.userId;
  const todoId = req.params.todoId;
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          todos: { todoId },
        },
      }
    );
    res.send(generateSuccess("Todo deleted!"));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e.message));
  }
};

module.exports.getTodos = async (req, res) => {
  const userId = req.app.locals.userId;
  try {
    const { todos } = await User.findOne({ _id: userId }).select("todos -_id");
    res.send(generateSuccess(todos));
  } catch (e) {
    console.error(e.message);
    res.send(generateError(e));
  }
};
