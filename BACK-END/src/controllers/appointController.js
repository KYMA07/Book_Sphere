import Appointment from '../models/appointModel.js';
import Book from '../models/bookModel.js';
import Student from '../models/studentModel.js';
import { BorrowRecord } from '../models/borrowModel.js';

export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { rows: appointments, count } = await Appointment.findAndCountAll({
      where,
      include: [Book, Student],
      limit: parseInt(limit),
      offset,
      order: [['scheduled_date', 'DESC']]
    });

    res.status(200).json({
      appointments,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalRecords: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, staff_id } = req.body;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    appointment.status = status;
    if (staff_id) appointment.staff_id = staff_id;
    await appointment.save();

    const book = await Book.findByPk(appointment.book_id);

    if (book) {
      switch (status) {
        case 'approved':
          book.status = 'reserved';
          break;

        case 'ready_for_pickup':
          book.status = 'ready_for_pickup';
          break;

        case 'picked_up':
          book.status = 'borrowed';

          // 🔗 Create BorrowRecord linked to this appointment
          const borrowDate = new Date();
          const dueDate = new Date(borrowDate);
          dueDate.setDate(dueDate.getDate() + 7);

          await BorrowRecord.create({
            student_id: appointment.student_id,
            book_id: appointment.book_id,
            staff_id: staff_id || null,
            appointment_id: appointment.appointment_id,
            source: 'appointment',
            borrow_date: borrowDate,
            due_date: dueDate,
            status: 'borrowed',
            penalty: 0
          });
          break;

        case 'awaiting_return':
          book.status = 'awaiting_return';
          break;

        case 'returned':
          book.status = 'available';

          // 🔗 Update BorrowRecord as returned
          const record = await BorrowRecord.findOne({
            where: {
              appointment_id: appointment.appointment_id,
              status: 'borrowed'
            }
          });
          if (record) {
            await record.update({
              status: 'returned',
              return_date: new Date()
            });
          }
          break;

        case 'denied':
          book.status = 'available';
          break;
      }

      await book.save();
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};