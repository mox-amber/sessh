import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const allGenres = {
  genres: ['Pop', 'Rock and Roll', 'Hawaiian', 'Jazz', 'Hip Hop', 'Gangster Rap', 'Classical'],
};

/**
 * The MusiciansGenre. Associates genre with musician.
 */
class MusicianGenreCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MusicianGenreCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      musician: String,
      genres: { type: Array, optional: true },
      'genres.$': { type: String, allowedValues: allGenres },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {MusicianGenreCollection}
 */
export const MusiciansGenres = new MusicianGenreCollection();
