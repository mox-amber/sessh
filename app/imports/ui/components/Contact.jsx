import React from 'react';
import { Button, Card, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Contact extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated = 'left'
            size='medium'
            src={this.props.contact.image}
          />
          <Card.Header>{this.props.contact.name}</Card.Header>
          <Card.Description>
            <Header as='h5'>Instruments:</Header>
            {this.props.contact.instruments.map((key) => <Button size='mini'>{key.name}</Button>)}
            <br/>
            <Header as='h5'>Genres:</Header>
            {this.props.contact.genres.map((key) => <Button size='mini'>{key.name}</Button>)}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Contact);
