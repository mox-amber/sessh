import React from 'react';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class EditProfile extends React.Component {
  render() {
    return (
      <Header id="edit-profile-page" as="h2" textAlign="center">
        <p>INPUT AN EDIT PROFILE PAGE!</p>
      </Header>
    );
  }
}
