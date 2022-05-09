import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class GenreItem extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2">{this.props.genre}</Header>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
GenreItem.propTypes = {
  genre: PropTypes.shape({
    // name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(GenreItem);
