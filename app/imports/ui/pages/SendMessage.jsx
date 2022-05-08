import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Dms } from '../../api/dm/Dm';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  to: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SendMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { to, message } = data;
    const from = Meteor.user().username;
    Dms.collection.insert({ to, from, message },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Message sent successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column id='addPage'>
          <Header as="h2" textAlign="center">Send Message</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='add-to' name='to'/>
              <LongTextField id='add-message' name='message'/>
              <SubmitField id='add-submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SendMessage;
