# Bus Availability App

Description:
* A login homepage that can only be accessed by users who know the username and password. 
The application is designed to be used within a single company, allowing only employees to access it in order to assist them with their work.
* A list of buses displaying their names and statuses, either "BOOKED" or "AVAILABLE", which can be changed depending on whether the bus has reservations or not.
* An "Update Reservations" button that allows users to add reserved dates using a calendar and assign a destination name.
* A "Delete" button for removing a bus.
* Filtering options by reservation date, name, or status ("BOOKED" or "AVAILABLE").
* The ability to add a new bus, with or without reservations.
* An "UNBOOK" button that clears all reservations for a specific bus.
* A Logout option.

### Built With MERN Stack, Material UI for design 

## Getting Started

Setup .env file with your data 

### Open a terminal for the frontend and run these commands:
```sh
    cd frontend && npm install
    npm run dev
```

### Open a terminal for the backend and run these commands:
```sh
    cd backend && npm install
    nodemon server.js
```
