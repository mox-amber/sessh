import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Musicians } from '../../api/musician/Musician';
import { Instruments } from '../../api/instruments/Instruments';
import { Genres } from '../../api/genre/Genre';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  age: Number,
  image: String,
  instruments: String,
  genres: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddMusician extends React.Component {

  // On submit, insert the data.
  submit(data) {
    const { name, age, image, instruments, genres } = data;
    const owner = Meteor.user().username;
    Instruments.collection.insert({ instruments });
    console.log('adding instrument');
    Genres.collection.insert({ genres });
    console.log('adding genre');
    Musicians.collection.insert({ name, age, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Musician added successfully', 'success');
        }
      });
    console.log('added musician');
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Musician</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <NumField name='age' decimal={false}/>
              <TextField name='image'/>
              <TextField name='instruments'/>
              <TextField name='genres'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddMusician;
