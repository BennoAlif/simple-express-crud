const { v4: uuidv4 } = require('uuid');
const httpCodes = require('../../../utils/httpCodes');
const response = require('../../../utils/response');
const fs = require('fs');

module.exports = {
  // Create
  crateTodo: async (req, res) => {
    try {
      const todos = getTodos();

      const { task } = req.body;

      if (task == null || task == '') {
        return response(res, httpCodes.BAD_REQUEST, 'Task cannot be empty');
      }

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;

      let todoData = {
        id: uuidv4(),
        task,
        timestamp: today,
        isCompleted: false,
      };

      todos.push(todoData);

      saveTodo(todos);

      return response(res, httpCodes.OK, 'Create todo success', todos);
    } catch (error) {
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  },

  // Read
  getTodos: async (req, res) => {
    try {
      const data = getTodos();
      return response(res, httpCodes.OK, 'Get todos success!', data);
    } catch (error) {
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  },

  // Update
  updateTodo: async (req, res) => {
    try {
      const id = req.params.id;

      const { task, isCompleted } = req.body;

      const todos = getTodos();
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        return response(res, httpCodes.NOT_FOUND, 'Task not found');
      }

      if (task == null || task == '') {
        return response(res, httpCodes.BAD_REQUEST, 'Task cannot be empty');
      }

      todos[todoIndex].task = task;

      if (isCompleted !== undefined) {
        todos[todoIndex].isCompleted = isCompleted;
      }

      saveTodo(todos);

      return response(res, httpCodes.OK, 'Update todo success', todos);
    } catch (error) {
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  },

  // Delete
  deleteTodo: async (req, res) => {
    try {
      const id = req.params.id;

      const todos = getTodos();

      const todoIndex = todos.findIndex((todo) => todo.id === id);

      if (todoIndex === -1) {
        return response(res, httpCodes.NOT_FOUND, 'Task not found');
      }

      const filteredTodos = todos.filter((todo) => todo.id !== id);

      saveTodo(filteredTodos);
      return response(res, httpCodes.OK, 'Delete todo success');
    } catch (error) {
      return response(res, httpCodes.INTERNAL_SERVER_ERROR, error.message);
    }
  },
};

const getTodos = () => {
  const jsonData = fs.readFileSync(
    process.cwd() + '/src/services/todo/models/todos.json',
  );
  return JSON.parse(jsonData);
};

const saveTodo = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(
    process.cwd() + '/src/services/todo/models/todos.json',
    stringifyData,
  );
};
