import { Router } from 'express';
import {
  getAllStudentsController,
  addStudentController
} from '../controllers/studentsController.js';

const studentsRouter = Router();

studentsRouter.get('/', async (_, res) => {
  try {
    const students = await getAllStudentsController();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

studentsRouter.post('/students', async (req, res) => {
  try {
    const result = await addStudentController(req.body);
    if (result === 1) {
      return res.status(201).json({ msg: 'Student added successfully.' });
    }
    return res.status(400).json({ msg: 'Student not added.' });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default studentsRouter;
