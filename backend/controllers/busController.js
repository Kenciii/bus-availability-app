import Bus from '../models/Bus.js';

export const getBuses = async (req, res) => {
    try {
        const { date, name, status } = req.query;
        let query = {};
        if (date) query['reservations.start'] = { $lte: date };
        if (date) query['reservations.end'] = { $gte: date };
        if (name) query.name = new RegExp(name, 'i');
        if (status === 'booked') query.isBooked = true;
        if (status === 'available') query.isBooked = false;
        const buses = await Bus.find(query);
        res.json(buses);
    } catch (error) {
        console.error("Error fetching buses:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getBusReservations = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json(bus.reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const bookBus = async (req, res) => {
    try {
        const { name, ranges } = req.body;
        const bus = await Bus.findOne({ name });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        if (!Array.isArray(bus.reservations)) {
            bus.reservations = [];
        }
        bus.isBooked = true;
        bus.reservations = [...bus.reservations, ...ranges];
        await bus.save();

        res.json({ message: 'Bus booked successfully!' });
    } catch (error) {
        console.error("Error booking bus:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const addBus = async (req, res) => {
    try {
        const { name, isBooked, reservations } = req.body;
        const newBus = new Bus({ name, isBooked, reservations: isBooked ? reservations : [] });
        await newBus.save();
        res.json({ message: 'Bus added successfully!' });
    } catch (error) {
        console.error("Error adding bus:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getBookedDates = async (req, res) => {
    try {
        const buses = await Bus.find({ isBooked: true });
        const allReservations = buses.flatMap(bus => bus.reservations);
        res.json(allReservations);
    } catch (error) {
        console.error("Error fetching booked reservations:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateDate = async (req, res) => {
    try {
        const { ranges } = req.body;
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        if (!Array.isArray(bus.reservations)) {
            bus.reservations = [];
        }
        bus.reservations = [...bus.reservations, ...ranges];
        bus.isBooked = bus.reservations.length > 0;
        await bus.save();

        res.json({ message: 'Dates updated!' });
    } catch (error) {
        console.error("Error updating dates:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const unbookBus = async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (bus) {
            bus.isBooked = false;
            bus.reservations = [];
            await bus.save();
        }
        res.json({ message: 'Booking cancelled!' });
    } catch (error) {
        console.error("Error unbooking bus:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteBus = async (req, res) => {
    try {
        await Bus.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        console.error('Failed to delete bus:', error);
        res.status(500).json({ message: 'Failed to delete bus' });
    }
};

export const removeDateRange = async (req, res) => {
    try {
        const { start, end } = req.body;
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        if (!Array.isArray(bus.reservations)) {
            bus.reservations = [];
        }

        bus.reservations = bus.reservations.filter(reservation =>
            !(reservation.start === start && reservation.end === end)
        );

        bus.isBooked = bus.reservations.length > 0;
        await bus.save();

        res.json({ message: 'Date range removed successfully', bus });
    } catch (error) {
        console.error('Failed to remove date range:', error);
        res.status(500).json({ message: 'Failed to remove date range' });
    }
};