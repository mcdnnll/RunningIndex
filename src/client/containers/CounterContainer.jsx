import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
// import {increment, decrement, incrementAsync, incrementIfOdd} from '../actions';
import * as actions from '../actions';
import Counter from '../Components/Counter';

const propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  // actions: {
  //   increment: PropTypes.func.isRequired,
  //   incrementIfOdd: PropTypes.func.isRequired,
  //   incrementAsync: PropTypes.func.isRequired,
  //   decrement: PropTypes.func.isRequired,
  // },
  counter: PropTypes.number.isRequired,
};

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <Counter
          counter={this.props.counter} 
          increment={() => this.props.actions.increment()}
          decrement={() => this.props.actions.decrement()}
          incrementIfOdd={() => this.props.actions.incrementIfOdd()}
          incrementAsync={() => this.props.actions.incrementAsync()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch) };
};

CounterContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
