import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    name: String,
    isBooked: Boolean,
    date: [Date],
    reservations: [
        {
          start: { type: String, required: true },  
          end: { type: String, required: true },
          destination: String
        }
      ],      
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;