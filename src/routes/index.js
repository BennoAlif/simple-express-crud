const { Router } = require('express');
const todoService = require('../services/todo/routes/index');

const router = Router();

router.use('/todos', todoService);

module.exports = router;
