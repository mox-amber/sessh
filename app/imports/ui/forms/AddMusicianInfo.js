import SimpleSchema from 'simpl-schema';

const allInstruments = ['Guitar', 'Piano', 'Violin', 'Drums', 'Saxophone', 'Cello', 'Flute', 'Clarinet', 'Trumpet', 'Banjo', 'Ukulele', 'Mbira', 'Cowbell', 'Triangle', 'Other'];

const allGenres = ['Pop', 'Rock and Roll', 'Hawaiian', 'Jazz', 'Hip Hop', 'Gangster Rap', 'Classical'];

const MusicianFormSchema = new SimpleSchema({
  name: String,
  age: Number,
  image: String,
  instruments: { label: 'Instruments', type: Array, optional: true },
  'instruments.$': { type: String, allowedValues: allInstruments },
  genres: { label: 'Genres', type: Array, optional: true },
  'genres.$': { type: String, allowedValues: allGenres },

});

export { MusicianFormSchema, allGenres, allInstruments };
