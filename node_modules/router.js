import express from "express";
import problemCtrl from "./problemController.js";

const router = express.Router();

router.route('/:id').get(problemCtrl.getProblem);
router.route('/action/getting_problems').get(problemCtrl.getAllProblems);
router.route('/sort/:type').get(problemCtrl.getProblemsByType)

router.route('/').get((req, res) => res.send('hello world'));

export default router;
