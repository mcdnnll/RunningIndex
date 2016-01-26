import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchGraphData } from '../actions';
import { Column, Grid } from '../components/core/layout/Grid.react';
import RunTotalsGraph from '../components/RunTotalsGraph';
import GraphSelector from '../components/GraphSelector';
import TestGraph from '../components/TestGraph';
import d3 from 'd3';

const propTypes = {
  graphData: PropTypes.array,
};

const defaultProps = {
  graphData: [],
  dataView: 'TOTAL',
};

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeView: 'TOTAL'};
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGraphData());
  }

  handleViewChange(nextView) {
    this.setState({activeView: nextView});
  }

  renderTotal() {
    const { graphData } = this.props;

    const dataset = graphData.map((entry) => {
      entry.date = d3.time.format.iso.parse(entry.date);
      return entry;
    });


    const tempGraph = dataset.slice(dataset.length - 100, dataset.length);

    const graphProps = {
      width: 890,
      height: 450,
      xColumn: 'date',
      yColumn: 'runningIndex',
      margin: {
        left: 35,
        top: 20,
        right: 20,
        bottom: 25,
      },
      barPadding: 0.1,
    };

    return (
      <RunTotalsGraph
        runData={dataset}
        // runData={tempGraph}
        graphProps={graphProps}
      />
    );
  }

  renderMonthlyAvg() {
    return (
      <div>Not rendered yet</div>
    );
  }

  renderSpinner() {
    return <div>Spinner</div>;
  }

  render() {
    const view = this.state.activeView;
    const { graphIsLoading } = this.props;

    let renderActiveView;
    if (view === 'MONTHLY_AVG') {
      renderActiveView = (graphIsLoading) ? this.renderSpinner() : this.renderMonthlyAvg();
    } else if (view === 'TOTAL') {
      renderActiveView = (graphIsLoading) ? this.renderSpinner() : this.renderTotal();
    }

    return (
      <Grid>
        <Column type="col-1-1">
          <GraphSelector
            currentView={this.state.activeView}
            changeView={this.handleViewChange}
          />
          <div className="graph-container">
            {renderActiveView}
          </div>
        </Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    graphData: state.dashboard.graphData,
    graphIsLoading: state.dashboard.graphIsLoading,
  };
};

GraphContainer.propTypes = propTypes;
GraphContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(GraphContainer);
