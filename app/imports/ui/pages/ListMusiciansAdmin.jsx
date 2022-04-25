import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Musicians } from '../../api/musician/Musician';
import MusicianItemAdmin from '../components/MusicianItemAdmin';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMusiciansAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Musicians (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.musicians.map((musician) => <MusicianItemAdmin key={musician._id} musician={musician} />)}
          </Table.Body>
        </Table>
      </Container>

    );
  }
}

// Require an array of Stuff documents in the props.
ListMusiciansAdmin.propTypes = {
  musicians: PropTypes.array.isRequired,
  musiciansGenres: PropTypes.array.isRequired,
  musiciansInstruments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Musicians.adminPublicationName);
  const subscription2 = Meteor.subscribe(MusiciansGenres.userPublicationName);
  const subscription3 = Meteor.subscribe(MusiciansInstruments.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription3.ready() && subscription2.ready();
  // Get the Stuff documents
  const musicians = Musicians.collection.find({}).fetch();
  const musiciansGenres = MusiciansGenres.collection.find({}).fetch();
  const musiciansInstruments = MusiciansInstruments.collection.find({}).fetch();
  // console.log(ready, musicians, musiciansGenres, musiciansInstruments);
  return {
    musicians,
    musiciansGenres,
    musiciansInstruments,
    ready,
  };
})(ListMusiciansAdmin);
