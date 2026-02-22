// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  roomType: String,
  checkIn: Date,
  checkOut: Date,
  paidAmount: Number,
  dueAmount: Number,
  status: {
    type: String,
    enum: ["Pending", "Success"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);