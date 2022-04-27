import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Name"
                  id="signup-form-name"
                  icon="info"
                  iconPosition="left"
                  name="name"
                  placeholder="Name"
                  type="name"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Age"
                  id="signup-form-age"
                  icon="plus"
                  iconPosition="left"
                  name="age"
                  placeholder="Age"
                  type="number"
                  max={99}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Instruments"
                  id="signup-form-instruments"
                  icon="music"
                  iconPosition="left"
                  name="music"
                  type="music"
                  placeholder="Instruments"
                  onChange={this.handleChange}
                />
                <select name="instruments" multiple="" className="ui fluid dropdown">
                  <option value="">Instruments</option>
                  <option value="angular">Angular</option>
                </select>
                <Form.Input
                  label="Genres"
                  id="signup-form-genres"
                  icon="headphones"
                  iconPosition="left"
                  name="genre"
                  type="genre"
                  placeholder="Genre"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Image"
                  id="signup-form-image"
                  icon="file image"
                  iconPosition="left"
                  name="genre"
                  type="genre"
                  placeholder="Image"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
