import SimpleSchema from 'simpl-schema';

const allGenres = ['Pop', 'Rock and Roll', 'Hawaiian', 'Jazz', 'Hip Hop', 'Gangster Rap', 'Classical'];

const MusicianFormSchema = new SimpleSchema({
  name: String,
  age: Number,
  image: String,
  instruments: String,
  genres: { label: 'Genres', type: Array, optional: true },
  'genres.$': { type: String, allowedValues: allGenres },
});

export { MusicianFormSchema, allGenres };
