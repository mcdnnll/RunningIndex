import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchGraphData } from '../actions/dashboardActions';
import { Column, Grid } from '../components/Layout';
import RunTotalsGraph from '../components/RunTotalsGraph';
import RunAvgGraph from '../components/RunAvgGraph';
import GraphSelector from '../components/GraphSelector';
import Spinner from '../components/Spinner';

const propTypes = {
  dataset: PropTypes.array,
  monthlyAvg: PropTypes.array,
  graphIsLoading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  dataset: [],
  monthlyAvg: [],
  dataView: 'MONTHLY_AVG',
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'MONTHLY_AVG',
    };
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  // Initiate XHR to retrieve graph data
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGraphData());
  }

  // GraphSelector selects which graph is currently in view
  handleViewChange(nextView) {
    this.setState({activeView: nextView});
  }

  // Generate graph properties that are common to both bar and scatter charts
  commonGraphProps() {
    return {
      width: 890,
      height: 450,
      margin: {
        left: 45,
        top: 20,
        right: 20,
        bottom: 35,
      },
    };
  }

  renderTotalGraph() {
    const { dataset } = this.props;

    // Add additional props to commonGraphProps that are unique to
    // the scatter plot
    const graphProps = Object.assign({}, this.commonGraphProps(), {
      xColumn: 'date',
      yColumn: 'runningIndex',
      barPadding: 0.1,
    });

    return (
      <RunTotalsGraph
        runData={dataset}
        graphProps={graphProps}
      />
    );
  }

  renderMonthlyAvgGraph() {
    const { monthlyAvg } = this.props;

    // Add additional props to commonGraphProps that are unique to
    // the bar chart
    const graphProps = Object.assign({}, this.commonGraphProps(), {
      xColumn: 'date',
      yColumn: 'avg',
      barPadding: 0.1,
    });

    return (
      <RunAvgGraph
        runData={monthlyAvg}
        graphProps={graphProps}
      />
    );
  }

  render() {
    const { activeView } = this.state;
    const { graphIsLoading } = this.props;

    let renderActiveView;
    if (activeView === 'MONTHLY_AVG') {
      renderActiveView = this.renderMonthlyAvgGraph();
    } else if (activeView === 'TOTAL') {
      renderActiveView = this.renderTotalGraph();
    }

    return (
      <Grid>
        <Column type="col-1-1">
          <GraphSelector
            currentView={this.state.activeView}
            changeView={this.handleViewChange}
          />
          <div className="graph__container">
            {graphIsLoading ? <Spinner /> : renderActiveView}
          </div>
        </Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    monthlyAvg: state.dashboard.monthlyAvg,
    graphIsLoading: state.dashboard.graphIsLoading,
    dataset: state.entries.dataset,
  };
};

GraphContainer.propTypes = propTypes;
GraphContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(GraphContainer);
