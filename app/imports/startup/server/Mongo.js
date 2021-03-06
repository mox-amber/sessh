import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Musicians } from '../../api/musician/Musician';
import { Genres } from '../../api/genre/Genre';
import { Instruments } from '../../api/instrument/Instrument';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInstrument(instrument) {
  console.log(instrument);
  Instruments.collection.update({ name: instrument }, { $set: { name: instrument } }, { upsert: true });
}

function addGenre(genre) {
  console.log(genre);
  Genres.collection.update({ genres: genre }, { $set: { genres: genre } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addMusician({ name, age, image, owner, role, instruments, genres }) {
  console.log(`Defining profile ${owner}`);
  // Define the user in the Meteor accounts package.
  console.log('Create User: ', owner, role);
  createUser(owner, role);
  // Create the profile.
  Musicians.collection.insert({ name, age, image, owner });
  // Add interests and projects.
  instruments.map(instrument => MusiciansInstruments.collection.insert({ musician: name, instrument }));
  genres.map(genre => console.log(genre));
  genres.map(genre => MusiciansGenres.collection.insert({ musician: name, genre }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  instruments.map(instrument => addInstrument(instrument));
  genres.map(genre => addGenre(genre));
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultInstruments && Meteor.settings.defaultMusicians) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultMusicians.map(musician => addMusician(musician));
    console.log('Creating the default projects');
    Meteor.settings.defaultInstruments.map(instrument => addInstrument(instrument));
    addGenre(Meteor.settings.defaultGenres);
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
