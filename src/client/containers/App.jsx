import React, {PropTypes} from 'react';
import CounterContainer from './CounterContainer';

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
        <h1>Counter Example</h1>
        <CounterContainer />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
