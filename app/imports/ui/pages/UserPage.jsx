import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Loader, Image, Header, Menu } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AccountPage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header id='Account-Title' as="h2" textAlign='centered'>Your Account</Header>
        <Grid centered columns={2}>
          <Grid.Column floated='left'>
            <Image src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.CbYQWsJA-vXjze_S_8NQXAAAAA%26pid%3DApi&f=1' size='large'/>
          </Grid.Column>
          <Grid.Column>
            <Container id='info'>
              <div id='bolder'>Name:</div>
              <div>Placeholder</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Genres:</div>
              <div>Placeholder</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Instruments:</div>
              <div>Violin, Maracas, Panflute</div>
            </Container>
            <Container id='info'>
              <div id='bolder'>Email:</div>
              <div>john@foo.com</div>
            </Container>
            <Menu id='edit-button' borderless compact>
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
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const stuffs = Stuffs.collection.find({}).fetch();
  return {
    stuffs,
    ready,
  };
})(AccountPage);
