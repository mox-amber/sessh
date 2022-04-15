import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class MusicianItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.musician.name}</Table.Cell>
        <Table.Cell>{this.props.musician.age}</Table.Cell>
        <Table.Cell>{this.props.musician.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
MusicianItemAdmin.propTypes = {
  musician: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default MusicianItemAdmin;
