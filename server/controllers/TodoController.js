const Todo = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json({ message: "Todo Added Successfully", todo: todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });

    if (!todo) {
      res.status(404).json({ message: "Todo Not Found" });
    } else {
      res.status(200).json({
        message: "Todo Updated Successfully",
        updatedTodo: todo,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).json({ message: "Todo Not Found" });
    } else {
      res.status(200).json({ message: "Todo Deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { getTodos, getTodo, addTodo, updateTodo, deleteTodo };
