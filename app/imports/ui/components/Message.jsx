import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Musicians } from '../../api/musician/Musician';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            {this.props.dm.from}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Header as='h3'>{this.props.dm.message}</Header>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  dm: PropTypes.shape({
    from: PropTypes.string,
    message: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  musicians: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('EasyMessage');
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const musicians = Musicians.collection.find({}).fetch();
  return {
    musicians,
    ready,
  };
})(Message);
