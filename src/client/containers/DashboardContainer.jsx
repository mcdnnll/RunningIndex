import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getDashboardData } from '../actions';
import { Column, Grid } from '../components/core/layout/Grid.react';
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
      <Grid>
        <Column type="col-4-12">
          <RunSummary title="Run Count" runData={this.props.dashboard.runCount} />
        </Column>
        <Column type="col-4-12">
          <RunSummary title="Best Running Index" runData={this.props.dashboard.bestRun} />
        </Column>
      </Grid>
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
