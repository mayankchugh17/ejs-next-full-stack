const express = require('express');
const Service = require('../models/services.js');
const isAuth = require('../middlewares/isAuth.js');

// GET route 

const serviceRouter = express.Router();
serviceRouter.get('/', isAuth, async (req, res) => {
  try {
    const serviceData = await Service.findOne({});
    res.render('pages/services.ejs', { serviceData });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// POST route
serviceRouter.post('/', async (req, res) => {
  try {
    const { title, heading, description, list, subTitle, subDescription } = req.body;
   
      // Build array 
    const servicesList = list
      ? list.split(',').map(item => item.trim()).filter(Boolean)
      : [];

    const id = "698ad138873ac8849c6f37c2";
    let serviceData = await Service.findByIdAndUpdate(
      id,
      {
        title,
        heading,
        description,
        list: servicesList,
        subTitle,
        subDescription,
      },
      { new: true }
    );

    if (serviceData) {
      req.flash('success', 'Service section updated successfully!');
      console.log('Service section updated successfully');
    } else {
      // Create new document
      serviceData = new Service({
        title,
        heading,
        description,
        list: servicesList,
        subTitle,
        subDescription,
      });
      await serviceData.save();
      req.flash('success', 'Service section created successfully!');
      console.log('Service section created successfully');
    }

    return res.redirect('/services');
  } catch (err) {
    console.error('Error saving service section:', err);
    req.flash('error', 'Failed to update service section');
    return res.redirect('/services');
  }
});

// API to get service data
serviceRouter.get('/data', isAuth, async (req, res) => {
  try {
    const serviceData = await Service.findOne({});
    console.log('Service data:', serviceData);
    return res.status(200).json(serviceData);
  } catch (err) {
    console.error('Error fetching service data:', err);
 }
});

module.exports = serviceRouter;