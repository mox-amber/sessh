import React from 'react';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Message extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.dms.from}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Header as='h3'>{this.props.dms.message}</Header>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Message.propTypes = {
  musician: PropTypes.object.isRequired,
  dms: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default Message;
