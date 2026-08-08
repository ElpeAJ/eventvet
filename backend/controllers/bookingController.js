const { validationResult } = require('express-validator');
const Booking = require('../models/bookingmodel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { user_id, vendor_id, booking_date, service_date, amount, status } = req.body;

    const booking = await Booking.create({ user_id, vendor_id, booking_date, service_date, amount, status });
    return res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json({ message: 'All bookings retrieved successfully', bookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    return res.status(200).json({ message: 'Booking retrieved successfully', booking });
  } catch (error) {
    console.error('Error retrieving booking by ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { user_id, vendor_id, booking_date, service_date, amount, status } = req.body;

    const [updated] = await Booking.update({ user_id, vendor_id, booking_date, service_date, amount, status }, { where: { id: bookingId } });
    if (!updated) return res.status(404).json({ message: 'Booking not found' });
    return res.status(200).json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error('Error updating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deleted = await Booking.destroy({ where: { id: bookingId } });
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    return res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById
};