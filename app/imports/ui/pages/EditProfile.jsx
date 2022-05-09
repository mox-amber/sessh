import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Musicians } from '../../api/musician/Musician';

const bridge = new SimpleSchema2Bridge(Musicians.schema);

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { name, age, image, _id } = data;
    Musicians.collection.update(_id, { $set: { name, age, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <NumField name='age' decimal={false}/>
              <TextField name='image'/>
              <label><strong>Instruments</strong></label>
              <select name="instruments" multiple="" className="ui fluid dropdown">
                <option value="">Instruments</option>
                <option value="Guitar">Guitar</option>
                <option value="Banjo">Banjo</option>
                <option value="Viola">Viola</option>
                <option value="Ukulele">Ukelele</option>
                <option value="Mbira">Mbira</option>
                <option value="Clarinet">Clarinet</option>
                <option value="Cowbell">Cowbell</option>
              </select>
              <br/>
              <label><strong>Genres</strong></label>
              <select name="genres" multiple="" className="ui fluid dropdown">
                <option value="">Genres</option>
                <option value="Pop">Pop</option>
                <option value="RockAndRoll">Rock and Roll</option>
                <option value="Hawaiian">Hawaiian</option>
                <option value="Jazz">Jazz</option>
                <option value="HipHop">Hip Hop</option>
                <option value="GangsterRap">Gangster Rap</option>
                <option value="Classical">Classical</option>
              </select>
              <br/>
              <SubmitField value='Submit'/>
              <br/>
              <ErrorsField/>
              <HiddenField name='owner' />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = Meteor.user() ? Meteor.user().username : '';
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Musicians.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Musicians.collection.findOne({ owner: documentId });
  return {
    doc,
    ready,
  };
})(EditProfile);
