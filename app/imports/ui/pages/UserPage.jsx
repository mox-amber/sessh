import React from 'react';
import { Meteor, _ } from 'meteor/meteor';
import { Container, Grid, Loader, Image, Header, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Musicians } from '../../api/musician/Musician';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AccountPage extends React.Component {
  getIndex(data, wProperty, tag) {
    const theArray = _.pluck(data, wProperty);
    const index = _.findIndex(theArray, function (val) { return val === tag; });
    return index;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header id='Account-Title' as="h2" textAlign='center'>Your Account</Header>
        <Grid centered columns={2}>
          <Grid.Column floated='left'>
            <Image src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.CbYQWsJA-vXjze_S_8NQXAAAAA%26pid%3DApi&f=1' size='large'/>
          </Grid.Column>
          <Grid.Column>
            <Container id='info'>
              <div id='bolder'>Name:</div>
              <div>{this.getIndex(this.props.musicians, 'owner', this.props.apple[0].username)}</div>
              <div>{this.props.musicians[0].name}</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Age:</div>
              <div>{this.props.musicians[0].age}</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Genres:</div>
              <div>{this.props.musiciansGenres[0].genre}</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Instruments:</div>
              <div>{this.props.musiciansInstruments[0].instrument}</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Email:</div>
              <div>{this.props.musicians[0].owner}</div>
            </Container>
            <Menu id='edit-button' borderless compact size='large'>
              <Menu.Item as={NavLink} activeClassName="active" exact to="/edit-profile" key='edit-profile' id='footer'>edit</Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
AccountPage.propTypes = {
  musicians: PropTypes.array.isRequired,
  musiciansGenres: PropTypes.array.isRequired,
  musiciansInstruments: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  apple: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Musicians.userPublicationName);
  const subscription2 = Meteor.subscribe(MusiciansGenres.userPublicationName);
  const subscription3 = Meteor.subscribe(MusiciansInstruments.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription3.ready() && subscription2.ready();
  // Determine if the subscription is ready
  const musicians = Musicians.collection.find({}).fetch();
  const musiciansGenres = MusiciansGenres.collection.find({}).fetch();
  const musiciansInstruments = MusiciansInstruments.collection.find({}).fetch();
  const apple = Meteor.users.find({}).fetch();
  return {
    musicians,
    musiciansGenres,
    musiciansInstruments,
    ready,
    apple,
  };
})(AccountPage);
