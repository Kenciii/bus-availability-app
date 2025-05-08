import React from "react";
import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const formatDate = (dateObj) => {
  if (!dateObj) return "";
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

const BusFilters = ({
  date,
  setDate,
  searchName,
  setSearchName,
  statusFilter,
  setStatusFilter,
}) => {
  const parsedDate = date ? new Date(date) : null;

  const handleDateChange = (selectedDate) => {
    if (!selectedDate) {
      setDate("");
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;
    setDate(formatted);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={3}
      flexWrap="wrap"
      sx={{ my: 4 }}
    >

      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        customInput={
          <TextField
            label="Search by date"
            value={formatDate(parsedDate)}
            size="small"
            inputProps={{ readOnly: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarTodayIcon sx={{ color: "#547792" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "200px",
              cursor: "pointer",
              "& .MuiOutlinedInput-root": {
                color: "#213448",
                "& fieldset": {
                  borderColor: "primary",
                },
                "&:hover fieldset": {
                  borderColor: "primary",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#213448",
              },
            }}
          />
        }
        dateFormat="dd.MM.yyyy"
        placeholderText="Select date"
        isClearable
      />

      <TextField
        label="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        size="small"
        sx={{ width: "200px" }}
      />

      <TextField
        select
        label="Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        size="small"
        sx={{ width: "200px" }}
      >
        <MenuItem value="">All statuses</MenuItem>
        <MenuItem value="booked">Booked</MenuItem>
        <MenuItem value="available">Available</MenuItem>
      </TextField>
    </Box>
  );
};

export default BusFilters;
