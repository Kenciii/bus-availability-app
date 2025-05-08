import React, { useEffect, useState, useRef } from 'react';
import AddBusModal from './pages/AddBusModal';
import BusList from './pages/BusList';
import BusFilters from './pages/BusFilters';
import UpdateBusModal from './pages/UpdateBusModal';
import AdminPanel from './pages/AdminPanel';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const App = () => {
    const [buses, setBuses] = useState([]);
    const [date, setDate] = useState('');
    const [searchName, setSearchName] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const dateInputRef = useRef(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeUpdateId, setActiveUpdateId] = useState(null);
    const [reservationDestination, setReservationDestination] = useState(''); 

    useEffect(() => {
        if (!token) {
            setToken(localStorage.getItem('token'));
        }
    }, [token]);

    const fetchBuses = async () => {
        try {
            const res = await fetch(`http://localhost:5000/buses?date=${date}&name=${searchName}&status=${statusFilter}`);
            const data = await res.json();
            setBuses(data.map(bus => ({
                ...bus,
                reservations: bus.reservations || [],
            })));
        } catch (error) {
            console.error("Failed to fetch buses:", error);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, [date, searchName, statusFilter]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    if (!token) {
        return <AdminPanel setToken={setToken} />;
    }

    return (
        <ThemeProvider theme={theme}>
        <div>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                my: 7,
            }}
            >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'secondary' }}>
                Bus Availability
            </Typography>
        </Box>

            <BusFilters
                date={date}
                setDate={setDate}
                dateInputRef={dateInputRef}
                searchName={searchName}
                setSearchName={setSearchName}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            <BusList
                buses={buses}
                handleUnbook={async (id) => {
                    try {
                        await fetch(`http://localhost:5000/unbook/${id}`, { method: 'DELETE' });
                        setBuses(prevBuses =>
                            prevBuses.map(bus =>
                                bus._id === id ? { ...bus, isBooked: false, reservations: [] } : bus
                            )
                        );
                        if (activeUpdateId === id) {
                        }
                    } catch (error) {
                        console.error("Failed to unbook:", error);
                    }
                }}
                handleOpenUpdate={setActiveUpdateId}
                handleDeleteBus={async (id) => {
                    try {
                        await fetch(`http://localhost:5000/bus/${id}`, { method: 'DELETE' });
                        fetchBuses();
                    } catch (error) {
                        console.error("Failed to delete bus:", error);
                    }
                }}
                activeUpdateId={activeUpdateId}
                reservationDestination={reservationDestination}
                setReservationDestination={setReservationDestination}
                fetchBuses={fetchBuses}
            />

            <AddBusModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} onBusAdded={fetchBuses} />
            {activeUpdateId && (
                <UpdateBusModal
                    busId={activeUpdateId}
                    buses={buses}
                    onClose={() => setActiveUpdateId(null)}
                    fetchBuses={fetchBuses}
                    reservationDestination={reservationDestination}
                    setReservationDestination={setReservationDestination}
                />
            )}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mt: 8,
                    mb: 8,
                }}
                >
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    sx={{ minWidth: 160, fontWeight: 'bold' }}
                >
                    Add new bus
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    endIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ minWidth: 160, fontWeight: 'bold' }}
                >
                    Logout
                </Button>
            </Box>

        </div>
        
    </ThemeProvider>
    );
};

export default App;