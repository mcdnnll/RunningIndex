import React, {PropTypes} from 'react';
import moment from 'moment';

const propTypes = {
  title: PropTypes.string,
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

class RunSummaryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeView: 'MONTH'};
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleViewChange(nextView) {
    this.setState({activeView: nextView});
  }

  // Convert raw UTC date to human-friendly format
  formatDate(rawDate) {
    return moment(rawDate).format('dddd Do MMM');
  }

  // Add active class to button on selection
  checkIsActive(viewState) {
    if (this.state.activeView === viewState) {
      return 'summary-card__btn--active';
    }

    // Return empty string to avoid appending undefined to class name
    return '';
  }

  renderTimePeriod(currentPeriod, lastPeriod) {

    // Retrieve data for current and last time periods
    const currentPeriodData = this.props.runData[currentPeriod];
    const lastPeriodData = this.props.runData[lastPeriod];

    let currentPeriodString, lastPeriodString;
    switch (currentPeriod) {
      case 'thisYear':
        currentPeriodString = 'This Year';
        lastPeriodString = 'Last Year';
        break;
      case 'thisMonth':
        currentPeriodString = 'This Month';
        lastPeriodString = 'Last Month';
        break;
      case 'thisWeek':
        currentPeriodString = 'This Week';
        lastPeriodString = 'Last Week';
        break;
      default:
        currentPeriodString = 'This Month';
        lastPeriodString = 'Last Month';
    }

    return (
        <div className="summary-card__display-group">
          <div className="summary-card__display">
            <div>{lastPeriodString}</div>
            <div className="summary-card__display-value">
              {lastPeriodData.value}
            </div>
            <div className="summary-card__display-date">
            {lastPeriodData.date ? this.formatDate(lastPeriodData.date) : <div></div>}
            </div>
          </div>
          <div className="summary-card__display">
            <div>{currentPeriodString}</div>
            <div className="summary-card__display-value">{currentPeriodData.value}</div>
            <div className="summary-card__display-date">
              {currentPeriodData.date ? this.formatDate(currentPeriodData.date) : <div></div>}
            </div>
          </div>
        </div>
    );
  }

  render() {
    const { title } = this.props;

    let renderActiveView;
    const dataView = this.state.activeView;

    if (dataView === 'WEEK') {
      renderActiveView = this.renderTimePeriod('thisWeek', 'lastWeek');
    } else if (dataView === 'MONTH') {
      renderActiveView = this.renderTimePeriod('thisMonth', 'lastMonth');
    } else if (dataView === 'YEAR') {
      renderActiveView = this.renderTimePeriod('thisYear', 'lastYear');
    }

    return (
      <div className="summary-card">
        <div className="summary-card__header">
          <div className="summary-card__title">{title}</div>
        </div>
        <div className="summary-card__btn-group">
          <button className={'summary-card__btn summary-card__btn--left ' + this.checkIsActive('WEEK')}
            onClick={this.handleViewChange.bind(this, 'WEEK')}>Weekly</button>
          <button className={'summary-card__btn summary-card__btn--centre ' + this.checkIsActive('MONTH')}
            onClick={this.handleViewChange.bind(this, 'MONTH')}>Monthly</button>
          <button className={'summary-card__btn summary-card__btn--right ' + this.checkIsActive('YEAR')}
            onClick={this.handleViewChange.bind(this, 'YEAR')}>Yearly</button>
        </div>
        {renderActiveView}
      </div>
    );
  }
}

RunSummaryCard.defaultProps = defaultProps;
RunSummaryCard.propTypes = propTypes;

export default RunSummaryCard;
