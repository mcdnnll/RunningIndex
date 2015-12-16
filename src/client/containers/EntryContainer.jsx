import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import {increment, decrement, incrementAsync, incrementIfOdd} from '../actions';
import {addEntry} from '../actions';
import AddEntry from '../Components/AddEntry';
import EntryList from '../Components/EntryList';

const propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  entries: PropTypes.array,
};

class EntryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewEntry = this.handleNewEntry.bind(this);
  }

  handleNewEntry(runningIndex, location) {
    this.props.dispatch(addEntry(runningIndex, location));
  }

  render() {
    return (
      <div>
        <AddEntry onAddClick={this.handleNewEntry}/>
        <EntryList entries={this.props.entries}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

EntryContainer.propTypes = propTypes;

export default connect(mapStateToProps)(EntryContainer);
