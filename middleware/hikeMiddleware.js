const uuid = require('uuid');
const express = require('express');
const Hike = require('../models/hike');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hikes = await Hike.findAll();
    console.log(JSON.stringify(hikes));
    res.render('hike', { title: 'My Hiking Log', hikes: hikes });
  } catch (err) {
    console.error('Error fetching hikes:', err);
    res.send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const input = req.body.hike;
    const hike = {
      HIKE_DATE: new Date(),
      ID: uuid.v4(),
      NAME: input.NAME,
      LOCATION: input.LOCATION,
      DISTANCE: input.DISTANCE,
      WEATHER: input.WEATHER,
    };
    console.log('Request to log hike:', JSON.stringify(hike));

    await Hike.create(hike);
    res.redirect('/hikes');
  } catch (err) {
    console.error('Error adding hike:', err);
    res.send(err);
  }
});

module.exports = router;