const express = require("express");
const todo = require("../controllers/todo");

const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/all", [auth], todo.getTodos);
router.post("/new", [auth], todo.createTodo);
router.put("/edit/:todoId", [auth], todo.editTodo);
router.put("/delete/:todoId", [auth], todo.deleteTodo);

module.exports = router;
