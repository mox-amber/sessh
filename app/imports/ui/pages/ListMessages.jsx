import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Dms } from '../../api/dm/Dm';
import { Musicians } from '../../api/musician/Musician';
// import { Message } from '../components/Message';

class ListMessages extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    // finds the name of the musician by matching the owner with the current meteor.user().username
    const thisMusician = _.find(this.props.musicians, function (account) {
      return account.owner === Meteor.user().username;
    });
    console.log(thisMusician);
    // returns all messages addressed to this musician as an array
    const array = _.filter(this.props.dms, function (account) {
      return account.to === thisMusician.name;
    });
    // uses only the 'message' portion of the returned array items
    const messages = _.pluck(array, 'message');
    console.log(messages);

    return (
      <Container>
        <Header as="h2" textAlign="center">Messages</Header>
        <div>{messages}</div>

      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListMessages.propTypes = {
  dms: PropTypes.array.isRequired,
  musicians: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Dms.userPublicationName);
  const subscription2 = Meteor.subscribe(Musicians.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const dms = Dms.collection.find({}).fetch();
  const musicians = Musicians.collection.find({}).fetch();
  return {
    dms,
    musicians,
    ready,
  };
})(ListMessages);
