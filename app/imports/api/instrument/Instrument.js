import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const allInstruments = {
  genres: ['Guitar', 'Piano', 'Violin', 'Drums', 'Saxophone', 'Cello', 'Flute', 'Clarinet', 'Trumpet', 'Banjo', 'Ukulele', 'Mbira', 'Cowbell', 'Triangle', 'Other'],
};

const InstrumentSchema = new SimpleSchema({
  instruments: { type: Array, optional: true },
  'instruments.$': { type: String, allowedValues: allInstruments },
}, { tracker: Tracker });

/**
 * The InstrumentsCollection. It manages the list of genres a user can associate with their account.
 */
class InstrumentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'InstrumentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.collection.schema = InstrumentSchema;
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {InstrumentsCollection}
 */
export const Instruments = new InstrumentsCollection();
