import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Musicians } from '../../api/musician/Musician';
import { Genres } from '../../api/genre/Genre';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addMusicians(data) {
  console.log(` Adding: ${data.name} (${data.owner})`);
  Musicians.collection.insert(data);
}

function addGenres(data) {
  console.log(` Adding: ${data.name} `);
  Genres.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultMusicians) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the MusiciansCollection if empty.
if (Musicians.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default musicians.');
    Meteor.settings.defaultMusicians.map(data => addMusicians(data));
  }
}
if (Genres.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default genres.');
    Meteor.settings.defaultGenres.map(data => addGenres(data));
  }
}
