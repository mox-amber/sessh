import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Menu, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Contact from '../components/Contact';
import { Genres } from '../../api/genre/Genre';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindMusician extends React.Component {

  // Test data for functionality
  contacts = [
    {
      name: 'John Doe',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F3942%2F15495643726_a5a1f03131.jpg&f=1&nofb=1',
      instruments: [
        { name: 'Guitar' },
        { name: 'Banjo' },
        { name: 'Viola' },
      ],
      genres: [
        { name: 'Pop' },
        { name: 'Hip Hop' },
        { name: 'Rock and Roll' },
      ],
    },
    {
      name: 'Annie Johnson',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F4128%2F5003942799_1bd51d8523_b.jpg&f=1&nofb=1',
      instruments: [
        { name: 'Mbira' },
        { name: 'Clarinet' },
        { name: 'Guitar' },
      ],
      genres: [
        { name: 'Hawaiian' },
        { name: 'Jazz' },
        { name: 'Hip Hop' },
        { name: 'Gangster Rap' },
      ],
    },
    {
      name: 'Joe Jackson',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.CbYQWsJA-vXjze_S_8NQXAAAAA%26pid%3DApi&f=1',
      instruments: [
        { name: 'Mbira' },
        { name: 'Guitar' },
        { name: 'Cowbell' },
      ],
      genres: [
        { name: 'Pop' },
        { name: 'Hawaiian' },
      ],
    },
  ];

  genreOptions = [
    { key: 'any', text: 'Any', value: 'Any' },
    { key: 'pop', text: 'Pop', value: 'Pop' },
    { key: 'rock-and-roll', text: 'Rock and Roll', value: 'Rock and Roll' },
    { key: 'hawaiian', text: 'Hawaiian', value: 'Hawaiian' },
    { key: 'jazz', text: 'Jazz', value: 'Jazz' },
    { key: 'hiphop', text: 'Hip Hop', value: 'Hip Hop' },
    { key: 'gangster-rap', text: 'Gangster Rap', value: 'Gangster Rap' },
    { key: 'classical', text: 'Classical', value: 'Classical' },
  ];

  instrumentOptions = [
    { key: 'any', text: 'Any', value: 'Any' },
    { key: 'Guitar', text: 'Guitar', value: 'Guitar' },
    { key: 'Banjo', text: 'Banjo', value: 'Banjo' },
    { key: 'Viola', text: 'Viola', value: 'Viola' },
    { key: 'Ukulele', text: 'Ukulele', value: 'Ukulele' },
    { key: 'Mbira', text: 'Mbira', value: 'Mbira' },
    { key: 'Clarinet', text: 'Clarinet', value: 'Clarinet' },
    { key: 'Cowbell', text: 'Cowbell', value: 'Cowbell' },
  ];

  state={ genreValue: 'Any', instrumentValue: 'Any' };

  // Changes state when user selects a genre from the dropdown
  handleGenreChange = (e, genre) => this.setState({ genreValue: genre.value });

  // Changes state when user selects an instrument from the dropdown
  handleInstrumentChange = (e, instrument) => this.setState({ instrumentValue: instrument.value });

  // Filters musicians based on preferences
  displayMusicians(genre, instrument) {
    let news = (genre === 'Any' || genre === {}) ? this.contacts : this.contacts.filter((x) => x.genres.some((y) => y.name === genre));
    news = (instrument === 'Any' || instrument === {}) ? news : news.filter((x) => x.instruments.some((y) => y.name === instrument));

    return (
      news.map((contact, index) => <Contact key={index} contact={contact} />)
    );
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const genre = this.state.genreValue;
    const instrument = this.state.instrumentValue;
    return (
      <Container id='searchPage'>
        <Menu borderless id='navBar'>
          <Menu.Item>
            <Header as="h2" textAlign="left" id='sesshHeader'>Find Musicians</Header>
          </Menu.Item>
          <Menu.Item position="right">
            Filters:
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              pointing="top right"
              text='Genres'
              onChange={this.handleGenreChange}
              options={this.genreOptions}
              value={genre}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              pointing="top right"
              text='Instruments'
              onChange={this.handleInstrumentChange}
              options={this.instrumentOptions}
              value={instrument}
            />
          </Menu.Item>
        </Menu>
        {/* Debug */}
        {/* <pre>Current value: {genre} {instrument}</pre> */}
        <Card.Group centered>
          {this.displayMusicians(genre, instrument)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindMusician.propTypes = {
  genres: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Genres.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const genres = Genres.collection.find({}).fetch();
  return {
    genres,
    ready,
  };
})(FindMusician);
