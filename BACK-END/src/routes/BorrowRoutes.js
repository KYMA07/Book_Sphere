import express from 'express';
import {
  borrowBook,
  returnBook,
  getAllBorrowRecords,
  getBorrowRecordsFiltered   // ✅ add this
} from '../controllers/borrowController.js';

const router = express.Router();

router.post('/borrow', borrowBook);
router.put('/return/:record_id', returnBook);
router.get('/', getAllBorrowRecords);
router.get('/filtered', getBorrowRecordsFiltered);  // ✅ now defined

export default router;  