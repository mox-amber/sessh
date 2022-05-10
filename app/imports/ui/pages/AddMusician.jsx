import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import MultiSelectField from '../forms/controllers/MultiSelectField';
import { MusicianFormSchema as formSchema } from '../forms/AddMusicianInfo';
import { Musicians } from '../../api/musician/Musician';
/* import { MusiciansGenres } from '../../api/musician/MusicianGenre';
import { Genres } from '../../api/genre/Genre';
import { Instruments } from '../../api/instruments/Instruments';
*/

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddMusician extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    let insertError;
    const { name, age, image, instruments, genre } = data; /* add instruments later */
    const owner = Meteor.user().username;
    Musicians.collection.insert({ name, age, image, instruments, genre, owner },
      (error) => { insertError = error; });
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      /* Genres.collection.insert({ name, genres },
        (error) => { insertError = error; });
      if (insertError) {
        swal('Error', insertError.message, 'error');
        console.log('NOT WORKING');
      } else {
        console.log('WORKING');
        swal('Success', 'The musician profile was created.', 'success');
        formRef.reset();
      } */
      swal('Success', 'The musician profile was created.', 'success');
      formRef.reset();
    }
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column id='add-page'>
          <Header as="h2" textAlign="center">Add Musician</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='add-name' name='name'/>
              <NumField id='add-age' name='age' decimal={false}/>
              <TextField id='add-image' name='image' placeholder={'Input image URL here'}/>
              <TextField id='add-instrument' name='instruments'/>
              <TextField id='add-genre' name='genres' showInlineError={true} placeholder={'Select genres (optional)'}/>
              <SubmitField id='add-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddMusician;
