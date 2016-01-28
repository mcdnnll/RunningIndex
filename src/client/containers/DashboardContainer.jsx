import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRunSummaryData } from '../actions';
import { Column, Grid } from '../components/core/layout/Grid.react';
import GraphContainer from './GraphContainer';
import RunSummaryCard from '../components/RunSummaryCard';
import RunTotalCard from '../components/RunTotalCard';

const propTypes = {};

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
    return (
      <div>
        <Grid>
          <Column type="col-4-12">
            <RunSummaryCard title="Run Count" runData={this.props.dashboard.runCount} />
          </Column>
          <Column type="col-4-12">
            <RunSummaryCard title="Best Running Index" runData={this.props.dashboard.bestRun} />
          </Column>
          <Column type="col-4-12">
            <RunTotalCard title="Lifetime Run Total" runData={this.props.dashboard.lifetimeTotal} />
            <RunTotalCard title="Best Monthly RI Avg" runData={this.props.dashboard.lifetimeTotal} />
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
