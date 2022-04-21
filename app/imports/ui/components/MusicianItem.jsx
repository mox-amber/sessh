import React from 'react';
import { Button, Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MusicianItem extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          {/* <Image */}
          {/*  floated = 'left' */}
          {/*  size='medium' */}
          {/*  src={this.props.musician.image} */}
          {/* /> */}
          <Card.Header>{this.props.musician.name}</Card.Header>
          <Card.Description>
            <Header as='h5'>Instruments:</Header>
            {/* eslint-disable-next-line react/jsx-key */}
            {this.props.instruments.map((key) => <Button size='mini'>{key.instrument}</Button>)}
            <br/>
            <Header as='h5'>Genres:</Header>
            {/* eslint-disable-next-line react/jsx-key */}
            {this.props.genres.map((key) => <Button size='mini'>{key.genre}</Button>)}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
MusicianItem.propTypes = {
  musician: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  instruments: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default MusicianItem;
