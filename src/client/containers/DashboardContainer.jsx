import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchRunSummaryData } from '../actions/dashboardActions';
import { Column, Grid } from '../components/Layout';
import GraphContainer from './GraphContainer';
import RunSummaryCard from '../components/RunSummaryCard';
import RunTotalCard from '../components/RunTotalCard';

const propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRunSummaryData());
  }

  renderSpinner() {
    return <div className="loader"></div>;
  }

  renderSummaryCards() {
    const currentTime = moment.now();
    const currentMonthStr = moment(currentTime).format('MMM YYYY');

    const {runCount, bestRun, lifetimeTotal } = this.props.dashboard;

    // Override null when there aren't any runs for the current month
    let currentMonthAvg;
    if (typeof this.props.dashboard.currentMonthAvg === 'undefined') {
      currentMonthAvg = 0;
    } else if (this.props.dashboard.currentMonthAvg.avg === null) {
      currentMonthAvg = 0;
    } else {
      currentMonthAvg = Math.round(this.props.dashboard.currentMonthAvg.avg);
    }

    return (
      <div>
        <Grid>
          <Column type="col-4-12 tablet-col-6-12 mobile-1-1">
            <RunSummaryCard title="Run Count Comparison" runData={runCount} />
          </Column>
          <Column type="col-4-12 tablet-col-6-12 mobile-1-1">
            <RunSummaryCard title="Best Index Comparison" runData={bestRun} />
          </Column>
          <Column type="col-4-12 tablet-col-6-12 mobile-1-1">
            <RunTotalCard title={'Average Index: ' + currentMonthStr} runData={currentMonthAvg} />
          </Column>
          <Column type="col-4-12 tablet-col-6-12 mobile-1-1">
            <RunTotalCard title="Lifetime Run Total" runData={lifetimeTotal} />
          </Column>
        </Grid>
      </div>
    );
  }

  render() {
    const pageIsLoading = this.props.dashboard.isLoading;
    return (
      <div>
        <GraphContainer />
        {pageIsLoading ? this.renderSpinner() : this.renderSummaryCards() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

DashboardContainer.propTypes = propTypes;

export default connect(mapStateToProps)(DashboardContainer);
