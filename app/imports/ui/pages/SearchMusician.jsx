import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Menu, Dropdown, Button, Select } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Musicians } from '../../api/musician/Musician';
import MusicianItem from '../components/MusicianItem';
import Contact from '../components/Contact';
import { Stuffs } from '../../api/stuff/Stuff';
import { Genres } from '../../api/genre/Genre';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindMusician extends React.Component {

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
    { key: 'any', text: 'Any', value: 'any' },
    { key: 'pop', text: 'Pop', value: 'pop' },
    { key: 'rock-and-roll', text: 'Rock and Roll', value: 'rock-and-roll' },
    { key: 'hawaiian', text: 'Hawaiian', value: 'hawaiian' },
    { key: 'jazz', text: 'Jazz', value: 'jazz' },
    { key: 'hiphop', text: 'Hip Hop', value: 'hiphop' },
    { key: 'gangster-rap', text: 'Gangster Rap', value: 'gangster-rap' },
    { key: 'classical', text: 'Classical', value: 'classical' },
  ];

  state={};

  handleChange = (e, { value }) => this.setState({ value });

  do(state) {
    if (state === 'ANY') { return; }
    this.contacts.filter((e) => e.name === 'Joe Johnson');
  }

  filtered = this.do(this.state);

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const { value } = this.state;
    return (
      <Container>
        <Menu borderless>
          <Menu.Item>
            <Header as="h2" textAlign="left">Find Musicians</Header>
          </Menu.Item>
          <Menu.Item position="right">
            Filters:
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              text='Genres'
              onChange={this.handleChange}
              onClick={this.handleClick}
              options={this.genreOptions}
              value={value}
            />
          </Menu.Item>
        </Menu>
        <pre>Current value: {value}</pre>
        <Card.Group>
          {this.filterd.map((contact, index) => <Contact key={index} contact={contact} />)}
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
