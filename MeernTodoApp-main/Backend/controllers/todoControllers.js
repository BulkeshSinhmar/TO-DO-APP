import { Todo } from "../models/todoSchema.js";

export async function createTodoController(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(200)
        .json({ message: "Please provide a title and description" });
    }

    await Todo({ title, description }).save();

    return res.status(200).json({
      success: true,
      message: "todo added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}

export async function updateTodoController(req, res) {
  try {
    const todoId = req.params.id;

    // console.log(todoId);

    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(200)
        .json({ message: "Please provide a title and description" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { title, description },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(200).json({
        success: false,
        message: "failed in updating todo",
      });
    }

    return res.status(200).json({
      success: true,
      message: "todo updated successfully",
      updatedTodo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}
export async function deleteTodoController(req, res) {
  try {
    const todoId = req.params.id;

    const deletedTodoItem = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodoItem) {
      return res.status(200).json({
        success: false,
        message: "failed in deleting todo item",
      });
    }

    return res.status(200).json({
      success: true,
      message: "todo deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}
export async function getOneTodoController(req, res) {
  try {
    const todoId = req.params.id;
    const Todo = await Todo.find({ _id: todoId });

    if (!Todo) {
      return res.status(200).json({
        success: false,
        message: "Todo Not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Find successfully",
      Todo,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
}
export async function getAllTodoController(req, res) {
  try {
    const allTodos = await Todo.find();

    if (!allTodos) {
      return res.status(200).json({
        success: false,
        message: "No todos found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "all todos send successfully",
      allTodos,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
}
