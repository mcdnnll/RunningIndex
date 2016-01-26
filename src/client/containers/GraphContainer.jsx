import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { fetchGraphData } from '../actions';
import { Column, Grid } from '../components/core/layout/Grid.react';
import RunTotalsGraph from '../components/RunTotalsGraph';
import GraphSelector from '../components/GraphSelector';


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

    const tempGraph = graphData.slice(graphData.length - 50, graphData.length)

    return (
      <RunTotalsGraph
        // runData={this.props.graphData}
        runData={tempGraph}
        width="890"
        height="450"
        x="date"
        y="runningIndex"
      />
          );
  }

  renderMonthlyAvg() {
    return (
      <div>Not rendered yet</div>
    );
  }

  render() {
    const view = this.state.activeView;
    let renderActiveView;
    if (view === 'MONTHLY_AVG') {
      renderActiveView = this.renderMonthlyAvg();
    } else if (view === 'TOTAL') {
      renderActiveView = this.renderTotal();
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
  };
};

GraphContainer.propTypes = propTypes;
GraphContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(GraphContainer);
