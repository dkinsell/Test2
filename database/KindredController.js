const mongoose = require('mongoose');
const Kindred = require('./KindredModel');

//mongoose array methods: .push to add documents for nested schemas, .isMongooseArray to check if pushable
//https://masteringjs.io/tutorials/mongoose/array#document-arrays

//within function to add events to Kindred
//get particularKindred using Kindred.find(`identifier`)
// particularKindred.events.push({
//   eventName: eventName,
//   eventDate: eventDate,
//   eventDescription: eventDescription,
// });
