import React, { useState, useEffect } from 'react';
import DatePicker from 'react-multi-date-picker';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UpdateBusModal = ({
  busId,
  buses,
  fetchBuses,
  reservationDestination,
  setReservationDestination
}) => {
  const [updateDates, setUpdateDates] = useState([]);
  const [bookedRangesForBus, setBookedRangesForBus] = useState([]);
  const bus = buses.find(b => b._id === busId);

  useEffect(() => {
    if (bus) {
      setBookedRangesForBus(bus.reservations || []);
      setUpdateDates([]);
    }
  }, [busId, buses]);

  const handleUpdateDate = async (updatedDates) => {
    const validDates = updatedDates
      .map(date => (date?.toDate ? date.toDate() : date))
      .filter(date => date instanceof Date && !isNaN(date));

    if (validDates.length === 0) return;

    const sortedDates = [...validDates].sort((a, b) => a - b);
    const startDate = sortedDates[0].toISOString().split('T')[0];
    const endDate = sortedDates[sortedDates.length - 1].toISOString().split('T')[0];
    const newRange = {
      start: startDate,
      end: endDate,
      destination: reservationDestination
    };

    try {
      await fetch(`http://localhost:5000/update-date/${busId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ranges: [newRange] })
      });
      setBookedRangesForBus(prev => [...prev, newRange]);
      fetchBuses();
      setUpdateDates([]);
      setReservationDestination('');
    } catch (error) {
      console.error("Failed to update dates:", error);
    }
  };

  const handleRemoveRange = async (rangeToRemove) => {
    try {
      await fetch(`http://localhost:5000/remove-date-range/${busId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rangeToRemove)
      });
      setBookedRangesForBus(prev =>
        prev.filter(r => !(r.start === rangeToRemove.start && r.end === rangeToRemove.end))
      );
      fetchBuses();
    } catch (error) {
      console.error("Error removing date range:", error);
    }
  };

  if (!bus) return null;

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: '1px solid #64b5f6',
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        maxWidth: '600px',
        mx: 'auto'
      }}
    >
      <Typography variant="h6" sx={{ color: '#213448', fontWeight: 'bold' }}>
        Update reservation for {bus.name}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '70%' }}>
        <TextField
          placeholder="Destination"
          variant="outlined"
          size="small"
          value={reservationDestination}
          onChange={(e) => setReservationDestination(e.target.value)}
          sx={{ width: '100%' }}
        />

        <DatePicker
          multiple
          value={updateDates}
          onChange={setUpdateDates}
          inputClass="custom-date-picker-input"
          mapDays={({ date }) => {
            const currentDate = date.toDate();
            const isBooked = bus.reservations?.some(range => {
              const start = new Date(range.start);
              const end = new Date(range.end);
              return currentDate >= start && currentDate <= end;
            });
            if (isBooked) {
              return {
                disabled: true,
                style: { backgroundColor: '#e0e0e0', color: '#64b5f6' }
              };
            }
            return {};
          }}
        />
      </Box>

      <Button
        variant="contained"
        onClick={() => handleUpdateDate(updateDates)}
        sx={{
          backgroundColor: '#2196f3',
          fontSize: '0.75rem',
          padding: '4px 12px',
          textTransform: 'none',
          mt: 1
        }}
      >
        Save dates
      </Button>

      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 2 }}>
          Reserved dates:
        </Typography>
        <List dense>
          {bookedRangesForBus.map((range, idx) => (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleRemoveRange(range)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={`${range.destination}: ${new Date(range.start).toLocaleDateString()} - ${new Date(range.end).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>


      <style>
        {`
          .custom-date-picker-input {
            width: 100%;
            padding: 9px 14px;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid #64b5f6;
            background-color: white;
            color: #333;
            outline: none;
            box-sizing: border-box;
          }
          .custom-date-picker-input:focus {
            border-color: #2196f3;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        `}
      </style>
    </Box>
  );
};

export default UpdateBusModal;
