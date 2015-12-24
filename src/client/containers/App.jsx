import React, {PropTypes} from 'react';
import Nav from '../components/nav/nav.react';
import {Column, Grid} from '../components/core/layout/grid.react';

import EntryContainer from './EntryContainer';

/**
 * Prop validation
 */
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

/**
 * App Component
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Nav />
        <Grid type="padded">
          <Column type="col-1-3">
            <p>Hello</p>
          </Column>
          <Column type="col-1-3">
            <EntryContainer />
          </Column>
          <Column type="col-1-3">
            <p>World</p>
          </Column>
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
