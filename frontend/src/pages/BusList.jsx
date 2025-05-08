import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import UpdateBusModal from './UpdateBusModal';

const BusList = ({ buses, handleUnbook, fetchBuses, handleDeleteBus }) => {
  const [activeUpdateBusId, setActiveUpdateBusId] = useState(null);
  const [reservationDestination, setReservationDestination] = useState('');
  const [confirmUnbookOpen, setConfirmUnbookOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);

  const handleConfirmUnbook = () => {
    handleUnbook(selectedBusId);
    setConfirmUnbookOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteBus(selectedBusId);
    setConfirmDeleteOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 3,
      }}
    >
      {buses.map((bus) => (
        <Box
          key={bus._id}
          sx={{
            border: '1px solid #64b5f6',
            borderRadius: '8px',
            padding: 2,
            width: '80%',
            maxWidth: '900px',
            backgroundColor: '#f9f9f9',
            transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            '&:hover': {
              borderColor: '#2196f3',
              boxShadow: '0 0 0 1px #2196f3',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: '#213448', fontWeight: 'bold' }}
            >
              {bus.name} - {bus.isBooked ? 'Booked' : 'Available'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {bus.isBooked && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSelectedBusId(bus._id);
                    setConfirmUnbookOpen(true);
                  }}
                >
                  UNBOOK
                </Button>
              )}
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  setActiveUpdateBusId((prev) =>
                    prev === bus._id ? null : bus._id
                  )
                }
              >
                {activeUpdateBusId === bus._id ? 'Close Update' : 'Update'}
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={() => {
                  setSelectedBusId(bus._id);
                  setConfirmDeleteOpen(true);
                }}
              >
                Delete Bus
              </Button>
            </Box>
          </Box>

          {activeUpdateBusId === bus._id && (
            <Box sx={{ mt: 2 }}>
              <UpdateBusModal
                busId={bus._id}
                buses={buses}
                onClose={() => setActiveUpdateBusId(null)}
                fetchBuses={fetchBuses}
                reservationDestination={reservationDestination}
                setReservationDestination={setReservationDestination}
              />
            </Box>
          )}
        </Box>
      ))}

    
      <Dialog
        open={confirmUnbookOpen}
        onClose={() => setConfirmUnbookOpen(false)}
      >
        <DialogTitle>Confirmation of reservation deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete all reservations for this bus?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUnbookOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmUnbook} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Bus Deletion Confirmation</DialogTitle>
        <DialogContent>
          <Typography>
          Are you sure you want to permanently delete this bus from the system?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BusList;
