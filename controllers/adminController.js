// controllers/adminController.js
const Booking = require("../models/dashboard/booking");

exports.getDashboard = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalBookings = await Booking.countDocuments();
  const todayBookings = await Booking.countDocuments({
    createdAt: { $gte: today },
  });

  const totalRevenue = await Booking.aggregate([
    { $group: { _id: null, total: { $sum: "$paidAmount" } } },
  ]);

  const totalCustomers = await Booking.distinct("name");

  // Monthly reservations chart
  const reservations = await Booking.aggregate([
    {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        total: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const bookingsList = await Booking.find().sort({ createdAt: -1 }).limit(10);

  res.render("admin/dashboard.ejs", {
    todayBookings,
    totalBookings,
    totalRevenue: totalRevenue[0]?.total || 0,
    totalCustomers: totalCustomers.length,
    reservations,
    bookingsList,
  });
};
