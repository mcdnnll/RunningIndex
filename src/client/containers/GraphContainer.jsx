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
};

const defaultProps = {
  dataset: [],
  monthlyAvg: [],
  dataView: 'TOTAL',
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: 'TOTAL',
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

  commonGraphProps() {
    const graphProps = {
      width: 890,
      height: 450,
      margin: {
        left: 35,
        top: 20,
        right: 20,
        bottom: 25,
      },
    };

    return graphProps;
  }

  renderTotalGraph() {
    const { dataset } = this.props;

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
          <div className="graph-container">
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
    dataset: state.entries.isoDateDataset,
  };
};

GraphContainer.propTypes = propTypes;
GraphContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(GraphContainer);
