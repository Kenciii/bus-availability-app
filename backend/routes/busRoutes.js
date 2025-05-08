import express from 'express';
import {
    getBuses,
    getBusReservations,
    bookBus,
    addBus,
    getBookedDates,
    updateDate,
    unbookBus,
    deleteBus,
    removeDateRange
} from '../controllers/busController.js';

const router = express.Router();

router.get('/buses', getBuses);
router.get('/bus-reservations/:id', getBusReservations);
router.post('/book', bookBus);
router.post('/add-bus', addBus);
router.get('/booked-dates', getBookedDates);
router.put('/update-date/:id', updateDate);
router.delete('/unbook/:id', unbookBus);
router.delete('/bus/:id', deleteBus);
router.put('/remove-date-range/:id', removeDateRange);

export default router;