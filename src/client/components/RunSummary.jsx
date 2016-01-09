
import React, {PropTypes} from 'react';

const propTypes = {
  runData: PropTypes.object,
};

const defaultProps = {
  runData: {
    thisYear: {value: 0, date: 0},
    lastYear: {value: 0, date: 0},
    thisMonth: {value: 0, date: 0},
    lastMonth: {value: 0, date: 0},
    thisWeek: {value: 0, date: 0},
    lastWeek: {value: 0, date: 0},
  },
  dataView: 'MONTH',
};

class RunSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeView: 'MONTH'};
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleViewChange(nextView) {
    this.setState({activeView: nextView});
  }

  renderWeek() {
    const { thisWeek, lastWeek } = this.props.runData;
    return (
      <div>
        <p>This Week</p>
        <p>{thisWeek.value}</p>
        <p>Last Week</p>
        <p>{lastWeek.value}</p>
      </div>
    );
  }

  renderMonth() {

    console.log(this.props)

    const { thisMonth, lastMonth } = this.props.runData;

    console.log(thisMonth, lastMonth);

    return (
      <div>
        <p>This Month</p>
        <p>{thisMonth.value}</p>
        <p>Last Month</p>
        <p>{lastMonth.value}</p>
      </div>
    );
  }

  renderYear() {
    const { thisYear, lastYear } = this.props.runData;
    return (
      <div>
        <p>This Year</p>
        <p>{thisYear.value}</p>
        <p>Last Year</p>
        <p>{lastYear.value}</p>
      </div>
    );
  }

  render() {
    const { title } = this.props;

    let renderActiveView;
    const dataView = this.state.activeView;

    if (dataView === 'WEEK') {
      renderActiveView = this.renderWeek();
    } else if (dataView === 'MONTH') {
      renderActiveView = this.renderMonth();
    } else if (dataView === 'YEAR') {
      renderActiveView = this.renderYear();
    }

    return (
      <div>
        <h5>{title}</h5>
        <button onClick={this.handleViewChange.bind(this, 'WEEK')}>Week</button>
        <button onClick={this.handleViewChange.bind(this, 'MONTH')}>Month</button>
        <button onClick={this.handleViewChange.bind(this, 'YEAR')}>Year</button>
        {renderActiveView}
      </div>
    );
  }
}

RunSummary.defaultProps = defaultProps;
RunSummary.propTypes = propTypes;

export default RunSummary;


