import React, {PropTypes} from 'react';
import {Grid, Column} from '../core/layout/Grid.react';

const propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

class AddEntryCard extends React.Component {
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
      <div className="card">
        <Grid>
          <Column type="col-12-12">
            <div className="card__title">Add New Entry</div>
          </Column>
        </Grid>
        <Grid>
          <Column type="col-1-4">
            <input className="card__input--date" type="date" ref="indexInput" placeholder="Date" />
          </Column>
          <Column type="col-1-4">
            <input className="card__input--text" type="text" ref="indexInput" placeholder="Running Index" />
          </Column>
          <Column type="col-1-4">
            <input className="card__input--text" type="text" ref="locationInput" placeholder="Location" />
          </Column>
          <Column type="col-1-4">
            <button className="card__btn" onClick={this.handleClick.bind(this, 'sync')}>Add</button>
          </Column>
        </Grid>
      </div>
    );
  }
}

AddEntryCard.propTypes = propTypes;

export default AddEntryCard;
