const Order = require("../models/Order");
const Product = require("../models/Product");
const moment = require("moment");

exports.getDashboard = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Monthly Growth
    const currentMonth = moment().startOf("month").toDate();
    const lastMonth = moment().subtract(1, "month").startOf("month").toDate();

    const thisMonthRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: currentMonth } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const lastMonthRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastMonth,
            $lt: currentMonth
          }
        }
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const current = thisMonthRevenue[0]?.total || 0;
    const previous = lastMonthRevenue[0]?.total || 0;

    const growth =
      previous === 0
        ? 100
        : (((current - previous) / previous) * 100).toFixed(2);

    // Weekly Performance
    const weekly = await Order.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Top Selling Products
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
          totalAmount: { $sum: "$products.price" }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" }
    ]);

    res.render("dashboard", {
      totalOrders,
      totalRevenue,
      growth,
      weekly,
      topProducts
    });
  } catch (err) {
    console.log(err);
  }
};
