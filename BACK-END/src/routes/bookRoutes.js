// routes/bookRoutes.js
import express from "express";
import { getAllBooks, addBook, updateBook, deleteBook, getBookById } from "../controllers/bookController.js";// the functions in bookController

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.get('/:id', getBookById);
router.put("/:id", updateBook);
router.delete('/:id', deleteBook);

export default router;