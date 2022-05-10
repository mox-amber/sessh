import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const allInstruments = {
  genres: ['Guitar', 'Piano', 'Violin', 'Drums', 'Saxophone', 'Cello', 'Flute', 'Clarinet', 'Trumpet', 'Banjo', 'Ukulele', 'Mbira', 'Cowbell', 'Triangle', 'Other'],
};

/**
 * The MusiciansGenre. Associates genre with musician.
 */
class MusicianInstrumentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'MusicianInstrumentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      musician: String,
      instruments: { type: Array, optional: true },
      'instruments.$': { type: String, allowedValues: allInstruments },
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
 * @type {MusicianInstrumentCollection}
 */
export const MusiciansInstruments = new MusicianInstrumentCollection();
