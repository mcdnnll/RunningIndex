import React, {PropTypes} from 'react';

const propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

class AddEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(eventType) {
    const runningIndex = this.refs.indexInput.value;
    const location = this.refs.locationInput.value;

    this.props.onAddClick(eventType, runningIndex, location);

    this.refs.indexInput.value = '';
    this.refs.locationInput.value = '';
  }

  render() {
    return (
      <div>
        <p>
          <input type="text" ref="indexInput" />
          <input type="text" ref="locationInput" />
          <button onClick={this.handleClick.bind(this, 'sync')}>Add</button>
          <button onClick={this.handleClick.bind(this, 'async')}>Add Async</button>
        </p>
      </div>
    );
  }
}

AddEntry.propTypes = propTypes;

export default AddEntry;
