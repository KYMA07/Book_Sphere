import express from 'express';
import {
  borrowBook,
  returnBook,
  getAllBorrowRecords
} from '../controllers/borrowController.js';

const router = express.Router();

router.post('/borrow', borrowBook);
router.put('/return/:record_id', returnBook);
router.get('/', getAllBorrowRecords);

export default router;
