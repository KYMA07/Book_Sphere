// routes/bookRoutes.js
import express from "express";
import { getAllBooks, addBook, updateBook, deleteBook, getBookById, updateBookStatus } from "../controllers/bookController.js";// the functions in bookController

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.get('/:id', getBookById);
router.put("/:id", updateBook);
router.delete('/:id', deleteBook);
router.put('/:id/status', updateBookStatus);

export default router;