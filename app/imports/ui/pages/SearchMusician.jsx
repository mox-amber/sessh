import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Menu, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Genres } from '../../api/genre/Genre';
import { Musicians } from '../../api/musician/Musician';
import { Instruments } from '../../api/instruments/Instruments';
import MusicianItem from '../components/MusicianItem';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindMusician extends React.Component {

  state = { genreValue: 'Any', instrumentValue: 'Any' };

  filtered = this.props.musicians;

  addOptions(collection) {
    const options = collection.map((option) => ({
      key: option.name,
      text: option.name,
      value: option.name,
    }));

    return ([{ key: 'Any', text: 'Any', value: 'Any' }].concat(options));
  }

  // Changes state when user selects a filter from one of the dropdown menus
  handleFilterChange = (e, filter) => {
    this.filtered = (filter.name === 'genre') ?
      this.filterMusicians(this.props.musiciansGenres, filter.value, filter.name) :
      this.filterMusicians(this.props.musiciansInstruments, filter.value, filter.name);
    // console.log(this.filtered);
    this.setState({ genreValue: filter.value });
  }

  // Filters musicians based on preferences
  filterMusicians(collection, value, option) {
    const newCollection = collection.filter(item => (item[option] === value));
    // const _musicians =

    // console.log(this.props.musicians.filter(musician => newCollection.find(item => item.musician === musician.name)));

    return (value === 'Any') ?
      this.props.musicians :
      this.props.musicians.filter(musician => newCollection.find(item => item.musician === musician.name));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const genreOptions = this.addOptions(this.props.genres);
    const instrumentOptions = this.addOptions(this.props.instruments);

    return (
      <Container id='searchPage'>
        <Menu borderless inverted id='navBar'>
          <Menu.Item>
            <Header as="h2" textAlign="left" id='sesshHeader'>Find Musicians</Header>
          </Menu.Item>
          <Menu.Item position="right">
            Filters:
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              name="genre"
              pointing="top right"
              text='Genres'
              onChange={this.handleFilterChange}
              options={genreOptions}
              value={this.state.genreValue}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              name="instrument"
              pointing="top right"
              text='Instruments'
              onChange={this.handleFilterChange}
              options={instrumentOptions}
              value={this.state.instrumentValue}
            />
          </Menu.Item>
        </Menu>
        <Card.Group centered>
          {/* {console.log(this.filtered)} */}
          {this.filtered.map((musician, index) => <MusicianItem
            key={index}
            musician={musician}
            genres={this.props.musiciansGenres.filter(genre => (genre.musician === musician.name))}
            instruments={this.props.musiciansInstruments.filter(instrument => (instrument.musician === musician.name))}
          />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindMusician.propTypes = {
  musicians: PropTypes.array.isRequired,
  musiciansGenres: PropTypes.array.isRequired,
  musiciansInstruments: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  instruments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const genreSub = Meteor.subscribe(Genres.userPublicationName);
  const instrumentsSub = Meteor.subscribe(Instruments.userPublicationName);
  const musiciansSub = Meteor.subscribe(Musicians.userPublicationName);
  const musiciansGenresSub = Meteor.subscribe(MusiciansGenres.userPublicationName);
  const musiciansInstrumentsSub = Meteor.subscribe(MusiciansInstruments.userPublicationName);

  // Determine if the subscriptions are ready
  const ready = (
    genreSub.ready() === true &&
    musiciansSub.ready() === true &&
    instrumentsSub.ready() === true &&
    musiciansGenresSub.ready() === true &&
    musiciansInstrumentsSub.ready() === true
  );
  // Get the documents
  const musicians = Musicians.collection.find({}).fetch();
  const genres = Genres.collection.find({}).fetch();
  const instruments = Instruments.collection.find({}).fetch();
  const musiciansGenres = MusiciansGenres.collection.find({}).fetch();
  const musiciansInstruments = MusiciansInstruments.collection.find({}).fetch();
  return {
    ready,
    musicians,
    musiciansGenres,
    musiciansInstruments,
    genres,
    instruments,
  };
})(FindMusician);
