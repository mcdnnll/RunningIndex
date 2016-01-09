import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDashboardData } from '../actions';

import RunSummary from '../components/RunSummary';

const propTypes = {};

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getDashboardData());
  }

  renderSpinner() {
    return <div>Spinner</div>;
  }

  renderDashboard() {
    return (
      <div>
        <RunSummary title="Run Count" runData={this.props.dashboard.runCount} />
        <RunSummary title="Best Run" runData={this.props.dashboard.bestRun} />
      </div>
    );
  }

  render() {
    const pageIsLoading = this.props.dashboard.isLoading;

    return (
      <div>
        {pageIsLoading ? this.renderSpinner() : this.renderDashboard() }
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
