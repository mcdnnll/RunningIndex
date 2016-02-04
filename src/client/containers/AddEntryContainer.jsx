import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import AddEntry from '../components/AddEntry';
import { postEntry } from '../actions/entryActions';

const propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

class AddEntryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddEntry = this.handleAddEntry.bind(this);
  }

  handleAddEntry(date, runningIndex, location, securityToken) {
    const { dispatch } = this.props;

    const newEntry = {
      date,
      runningIndex,
      location,
      securityToken,
    };

    dispatch(postEntry(newEntry));
  }

  render() {
    return <AddEntry {...this.props} handleAddEntry={this.handleAddEntry}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    addEntryPosted: state.entries.addEntryPosted,
    addEntryResult: state.entries.addEntryResult,
    addEntryFailed: state.entries.addEntryFailed,
  };
};

AddEntryContainer.propTypes = propTypes;

export default connect(mapStateToProps)(AddEntryContainer);
