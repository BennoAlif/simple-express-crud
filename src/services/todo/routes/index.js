const { Router } = require('express');
const todos = require('../controllers/TodoController');
const router = Router();

router.get('/', todos.getTodos);
router.post('/', todos.crateTodo);
router.put('/:id', todos.updateTodo);
router.delete('/:id', todos.deleteTodo);

module.exports = router;
