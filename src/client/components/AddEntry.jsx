import React, {PropTypes} from 'react';
import moment from 'moment';
import Spinner from './Spinner';

const propTypes = {
  handleAddEntry: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {

    // Validate and extract inputs, notify user of any errors
    // prior to posting to server

    const date = this.validateDate(this.refs.dateInput.value);
    if (date.error) {
      this.setState({error: date.error});
      return;
    }

    const runningIndex = this.validateRunningIndex(this.refs.indexInput.value);
    if (runningIndex.error) {
      this.setState({error: runningIndex.error});
      return;
    }

    const securityToken = this.validateSecurityToken(this.refs.securityInput.value);
    if (securityToken.error) {
      this.setState({error: securityToken.error});
      return;
    }

    const location = this.refs.locationInput.value;

    // Pass values to parent for submission
    this.props.handleAddEntry(date, runningIndex, location, securityToken);

    // Reset error and form inputs after submission
    if (this.state.error) {
      this.setState({error: false});
    }

    this.refs.indexInput.value = '';
    this.refs.locationInput.value = '';
    this.refs.dateInput.value = '';
    this.refs.securityInput.value = '';
  }

  validateDate(date) {

    const dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    // Ensure date is not empty and follows format convention
    if (!date || typeof date === 'undefined') {
      return {error: 'Sorry, a date must be provided'};
    } else if (!dateFormat.test(date)) {
      return {error: 'Sorry, the date format must be: DD/MM/YYYY'};
    }

    // Check that the date is a valid format
    if (!moment(date, 'DD/MM/YYYY').isValid()) {
      return {error: 'Sorry, the date you have provided is not valid'};
    }

    const inputDate = moment(date, 'DD/MM/YYYY');
    const currentDate = moment.now();

    // Only accept entry dates for today or older
    if (inputDate.isAfter(currentDate)) {
      return {error: 'Sorry, the date cannot be in the future'};
    }

    // Return parsed date in iso format
    return inputDate.toString();
  }

  validateRunningIndex(runningIndex) {

    const riFormat = /^\d{1,3}$/;

    // Ensure running index is not empty and is an integer
    if (!runningIndex || typeof runningIndex === 'undefined') {
      return {error: 'Sorry, a running index must be provided'};
    } else if (!riFormat.test(runningIndex)) {
      return {error: 'Sorry, the provided running index is not a valid number'};
    }

    // Perform secondary check to ensure running index is a valid integer after parsing
    const parsedRunningIndex = parseInt(runningIndex, 10);
    if (isNaN(parsedRunningIndex)) {
      return {error: 'Sorry, the provided running index is not a valid number'};
    }

    if (parsedRunningIndex <= 0 || parsedRunningIndex > 100) {
      return {error: 'Sorry, a valid running index is between 1 and 100'};
    }

    return parsedRunningIndex;
  }

  validateSecurityToken(securityToken) {

    if (!securityToken || typeof securityToken === 'undefined') {
      return {error: 'Sorry, a valid security token must be provided to submit'};
    }

    return securityToken;
  }

  renderError(errorMessage) {

    return (
      <div className="addEntry__error">
        <p className="addEntry__error--text">{errorMessage}</p>
      </div>
    );
  }

  render() {
    const { addEntryPosted, addEntryFailed, addEntryResult} = this.props;

    return (
      <div>
        <div className="addEntry__header">
          <span className="addEntry__title">Add New Entry</span>
          <span className="addEntry__closeModal" onClick={this.props.handleCloseModal}>X</span>
        </div>
        <div className="addEntry__input-group">
          <span>Date</span>
          <input className="addEntry__input" type="text" ref="dateInput" placeholder="DD/MM/YYYY" />
        </div>
        <div className="addEntry__input-group">
          <span>Running Index</span>
          <input className="addEntry__input" type="text" ref="indexInput" placeholder="1-100" />
        </div>
        <div className="addEntry__input-group">
          <span>Location</span>
          <input className="addEntry__input" type="text" ref="locationInput" placeholder="Sydney, Melbourne, etc" />
        </div>
        <div className="addEntry__input-group">
          <span>Security Token</span>
          <input className="addEntry__input" type="text" ref="securityInput" placeholder="Authenticate entry" />
        </div>
        <div className="addEntry__btn-group">
          <button className="addEntry__btn addEntry__btn--right" onClick={() => this.handleSubmit()}>Add</button>
          <button className="addEntry__btn addEntry__btn--left" onClick={this.props.handleCloseModal}>Cancel</button>
        </div>

        {this.state.error ? this.renderError(this.state.error) : null}
        {addEntryFailed ? this.renderError(addEntryResult) : null}

      </div>
    );
  }
}

AddEntry.propTypes = propTypes;

export default AddEntry;
