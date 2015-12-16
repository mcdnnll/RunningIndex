import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {increment, incrementIfOdd, incrementAsync, decrement, counter} = this.props;

    return (
      <div>
        <p>Clicked: {counter} times</p>
        <p>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
          <button onClick={incrementIfOdd}>Increment if odd</button>
          <button onClick={incrementAsync}>Increment Async</button>
        </p>
      </div>
    );
  }
}

Counter.propTypes = propTypes;

export default Counter;
