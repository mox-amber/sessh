import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Dms } from '../../api/dm/Dm';

class ListMessages extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const array = _.filter(this.props.dms, function (account) {
      console.log(Meteor.user());
      return account.to === Meteor.user().username;
    });
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
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Dms.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const dms = Dms.collection.find({}).fetch();
  return {
    dms,
    ready,
  };
})(ListMessages);
