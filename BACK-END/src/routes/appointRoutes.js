import express from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} from '../controllers/appointController.js';

const router = express.Router();

router.post('/', createAppointment); // Create new appointment
router.get('/', getAppointments); // Get all appointments
router.put('/:id/status', updateAppointmentStatus); // Update status

export default router;