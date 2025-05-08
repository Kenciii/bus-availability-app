import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
  Typography
} from '@mui/material';
import DatePicker from 'react-multi-date-picker';

const AddBusModal = ({ isOpen, onRequestClose, onBusAdded }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('available');
  const [selectedDates, setSelectedDates] = useState([]);
  const [reservationDestination, setReservationDestination] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setStatus('available');
      setSelectedDates([]);
      setReservationDestination('');
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      const bookedRanges = [];
      if (status === 'booked' && selectedDates.length > 0 && reservationDestination) {
        const sortedDates = [...selectedDates]
          .map(date => (date instanceof Date ? date : date?.toDate?.()))
          .filter(date => date instanceof Date && !isNaN(date))
          .sort((a, b) => a - b);

        if (sortedDates.length > 0) {
          const startDate = sortedDates[0].toISOString().split('T')[0];
          const endDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];
          bookedRanges.push({ start: startDate, end: endDate, destination: reservationDestination });
        }
      }

      const response = await fetch('http://localhost:5000/add-bus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          isBooked: status === 'booked',
          reservations: bookedRanges
        })
      });

      const result = await response.json();
      alert(result.message);
      onBusAdded();
      onRequestClose();
    } catch (error) {
      console.error('Error adding bus:', error);
      alert('Error adding bus');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: '#213448' }}
        >
          Add New Bus
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Bus Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          select
          fullWidth
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="booked">Booked</MenuItem>
        </TextField>

        {status === 'booked' && (
          <>
            <TextField
              label="Destination"
              value={reservationDestination}
              onChange={(e) => setReservationDestination(e.target.value)}
              fullWidth
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 1 }}>Select Booked Dates:</Typography>
                <DatePicker
                    multiple
                    value={selectedDates}
                    onChange={setSelectedDates}
                    style={{
                    width: '200%',
                    padding: '10px 12px',
                    border: '1px solid #64b5f6',
                    borderRadius: '4px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    }}
                    inputClass="custom-datepicker-input"
                />
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#213448' }}
        >
          Add Bus
        </Button>
        <Button onClick={onRequestClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBusModal;
