import React, { PropTypes } from 'react';
import Nav from '../components/nav/Nav.react';
import { Column, Grid } from '../components/core/layout/Grid.react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';


const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  handleRouteChange(nextRoute) {
    this.props.dispatch(pushPath(nextRoute));
  }

  render() {

    const navTitle = {
      name: 'RunningIndex', path: '/',
    };

    const navLinks = [
      {name: 'Dashboard', path: '/'},
      {name: 'Manage Entries', path: '/manage'},
    ];

    return (
      <div>
        <Nav
          navTitle={navTitle}
          navLinks={navLinks}
          updateRoute={this.handleRouteChange}
        />
        <Grid type="padded">
          <Column type="col-8-12 push-2-12">
            {this.props.children}
          </Column>
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default connect(pushPath)(App);
