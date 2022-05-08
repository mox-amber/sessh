import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Menu, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Genres } from '../../api/genre/Genre';
import { Musicians } from '../../api/musician/Musician';
import { Instruments } from '../../api/instrument/Instrument';
import MusicianItem from '../components/MusicianItem';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FindMusician extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
      genreFilter: 'Any',
      instrumentFilter: 'Any',
      musiciansList: this.props.collectionData.musicians,
      genreList: this.props.collectionData.musiciansGenres,
      instrumentList: this.props.collectionData.musiciansInstruments,
    };
  }

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
    if (filter.name === 'genre') {
      const value = filter.value === 'Any' ? {} : { genre: filter.value };
      this.setState({
        genreFilter: filter.value,
        instrumentFilter: this.state.instrumentFilter,
        musiciansList: this.filterMusicians(MusiciansGenres.collection.find(value).fetch(), 'genre'),
        genreList: MusiciansGenres.collection.find(value).fetch(),
      });
    } else if (filter.name === 'instrument') {
      const value = filter.value === 'Any' ? {} : { instrument: filter.value };
      this.setState({
        genreFilter: this.state.genreFilter,
        instrumentFilter: filter.value,
        musiciansList: this.filterMusicians(MusiciansInstruments.collection.find(value).fetch(), 'instrument'),
        instrumentList: MusiciansInstruments.collection.find(value).fetch(),
      });
    }
    this.setState({ load: false });
  }

  // Filters musicians based on preferences
  filterMusicians(collection, option) {
    // console.log(collection);
    const filterWith = (option === 'genre') ?
      this.state.instrumentList.filter(instrument => collection.find(genre => genre.musician === instrument.musician)) :
      this.state.genreList.filter(genre => collection.find(instrument => instrument.musician === genre.musician));

    return this.props.collectionData.musicians.filter(musician => filterWith.find(item => musician.name === item.musician));
  }

  renderMusicians() {
    const check = (this.state.load === true) ? this.props.collectionData.musicians : this.state.musiciansList;
    return check.map((musician, index) => <MusicianItem
      key={index}
      musician={musician}
      genres={this.props.collectionData.musiciansGenres.filter(genre => (genre.musician === musician.name))}
      instruments={this.props.collectionData.musiciansInstruments.filter(instrument => (instrument.musician === musician.name))}
    />);
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const genreOptions = this.addOptions(this.props.collectionData.genres);
    const instrumentOptions = this.addOptions(this.props.collectionData.instruments);

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
              value={this.state.genreFilter}
            />
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              name="instrument"
              pointing="top right"
              text='Instruments'
              onChange={this.handleFilterChange}
              options={instrumentOptions}
              value={this.state.instrumentFilter}
            />
          </Menu.Item>
        </Menu>
        <Card.Group centered>
          {this.renderMusicians()}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
FindMusician.propTypes = {
  collectionData: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscriptions = Meteor.subscribe('Search');

  // Determine if the subscriptions are ready
  const ready = subscriptions.ready();

  // Get the documents
  const collectionData = {
    musicians: Musicians.collection.find({}).fetch(),
    genres: Genres.collection.find({}).fetch(),
    instruments: Instruments.collection.find({}).fetch(),
    musiciansGenres: MusiciansGenres.collection.find({}).fetch(),
    musiciansInstruments: MusiciansInstruments.collection.find({}).fetch(),
  };
  return {
    ready,
    collectionData,
  };
})(FindMusician);
