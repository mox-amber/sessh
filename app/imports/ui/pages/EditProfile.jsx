import React from 'react';
import { Grid, Loader, Header, Segment, Image, Button, FormGroup } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Musicians } from '../../api/musician/Musician';
import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { MusiciansInstruments } from '../../api/musician/MusicianInstrument';

/** Renders the Page for editing a single document. */
class EditProfile extends React.Component {

  schema = new SimpleSchema({
    name: String,
    age: Number,
    image: String,
    owner: String,
    musician: String,
    instrument: { type: String, optional: true },
    genre: { type: String, optional: true },
  });

  // On successful submit, insert the data.
  submit(data) {
    const { name, age, image, instrument, genre, _id } = data;
    Musicians.collection.update(_id, { $set: { name, age, image } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
    if (instrument) {
      MusiciansInstruments.collection.insert({ musician: name, instrument: instrument });
    }
    if (genre) {
      MusiciansGenres.collection.insert({ musician: name, genre: genre });
    }
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready.musician && this.props.ready.musiciansGenres && this.props.ready.musiciansInstruments)
      ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {

    return (
      <Grid container centered>
        <Grid.Column id="editPage">
          <Header as="h2" textAlign="center">Edit Profile</Header>
          <AutoForm
            schema={new SimpleSchema2Bridge(this.schema)}
            onSubmit={data => this.submit(data)}
            model={this.props.docs.musician}
          >
            <Segment>
              <Image src={this.props.docs.musician.image} />
              <br/>
              <TextField id='image' name='image'/>
              <TextField id='name' name='name'/>
              <NumField id='age' name='age' decimal={false}/>
              <h4>Instruments: </h4>
              <FormGroup>
                {this.props.docs.musiciansInstruments.map(
                  (instrument) => (instrument.musician === this.props.docs.musician.name ?
                    <Button key={instrument._id}>
                      {instrument.instrument}
                    </Button> : ''),
                )}
                <TextField
                  width={4}
                  id='instrument'
                  name='instrument'
                  label=''
                  placeholder='Add Instrument'
                />
              </FormGroup>

              <h4>Genres: </h4>
              <FormGroup>
                {this.props.docs.musiciansGenres.map(
                  (genre) => (genre.musician === this.props.docs.musician.name ?
                    <Button key={genre._id}>
                      {genre.genre}
                    </Button> : ''),
                )}
                <TextField
                  width={4}
                  id='genre'
                  name='genre'
                  label=''
                  placeholder='Add Genre'
                />
              </FormGroup>

              <HiddenField id='musician' name='musician' value={this.props.docs.musician.name}/>

              <br/>
              <br/>
              <HiddenField name='owner' />
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>

          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditProfile.propTypes = {
  docs: PropTypes.object.isRequired,
  model: PropTypes.object,
  ready: PropTypes.object.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = Meteor.user() ? Meteor.user().username : '';
  // Get access to Stuff documents.
  const subscription = {
    musician: Meteor.subscribe(Musicians.userPublicationName),
    musiciansInstruments: Meteor.subscribe(MusiciansInstruments.userPublicationName),
    musiciansGenres: Meteor.subscribe(MusiciansGenres.userPublicationName),
  };
  // Determine if the subscription is ready
  const ready = {
    musician: subscription.musician.ready(),
    musiciansGenres: subscription.musiciansInstruments.ready(),
    musiciansInstruments: subscription.musiciansGenres.ready(),
  };
  // Get the document
  const docs = {
    musician: Musicians.collection.findOne({ owner: documentId }),
    musiciansInstruments: MusiciansInstruments.collection.find({}),
    musiciansGenres: MusiciansGenres.collection.find({}),
  };
  return {
    docs,
    ready,
  };
})(EditProfile);
