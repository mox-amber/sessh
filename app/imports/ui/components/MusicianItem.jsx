import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MusicianItem extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2">{this.props.musician.name}</Header>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
MusicianItem.propTypes = {
  musician: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default MusicianItem;
