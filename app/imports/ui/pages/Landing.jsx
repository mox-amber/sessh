import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="sessh-landing-bg">
        <Grid id='landing-page' centered stackable container rows={4}>
          <Grid.Row className="sessh-title" textAlign='center'>Sessh</Grid.Row>
          <div className="landing-center">
            <Grid.Row textAlign='center' className="spacer">
              <Icon size="huge" name="users"/>
              <h1>A Musical Network</h1>
              <h3>This here website serves to create a network for the musically inclined students of University of Hawaii</h3>
            </Grid.Row>
            <Grid.Row textAlign='center' className="spacer">
              <Icon size="huge" name="music"/>
              <h1>Display Your Tastes!</h1>
              <h3>Create an account and showcase what instrument and genre you play</h3>
            </Grid.Row>
            <Grid.Row textAlign='center' className="spacer">
              <Icon size="huge" name="search"/>
              <h1>Search Feature</h1>
              <h3>Users are able to search for other users who share the same musical interests and get in contact with them</h3>
            </Grid.Row>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Landing;
