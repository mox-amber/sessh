import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Musicians } from '../../api/musician/Musician';
import { Dms } from '../../api/dm/Dm';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  to: String,
  from: String,
  message: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class SendMessage extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { to, from, message } = data;
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
              <TextField id='add-from' name='from'/>
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

// Require a document to be passed to this component.
SendMessage.propTypes = {
  musicians: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('EasyMessage');
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const musicians = Musicians.collection.find({}).fetch();
  return {
    musicians,
    ready,
  };
})(SendMessage);
