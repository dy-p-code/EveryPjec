const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const PicksController = require('../controllers/picks.controller');
const picksController = new PicksController();

router.get('/', authMiddleware, picksController.getAllPick);

router.put('/', authMiddleware, picksController.createPick);

router.delete('/:pickId', authMiddleware, picksController.deletePick);

module.exports = router;
