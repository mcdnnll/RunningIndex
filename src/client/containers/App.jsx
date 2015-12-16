import React, {PropTypes} from 'react';
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
        <h1>Running Index</h1>
        <EntryContainer />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
