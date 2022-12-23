const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

const PicksController = require('../controllers/picks.controller');
const picksController = new PicksController();

router.get('/:userId', authMiddleware, picksController.getAllPick);

router.post('/:postId', authMiddleware, picksController.createPick);

router.delete('/:postId', authMiddleware, picksController.deletePick);

module.exports = router;
