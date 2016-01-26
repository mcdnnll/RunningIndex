import React, {PropTypes} from 'react';
import d3 from 'd3';

const propTypes = {
  runData: PropTypes.array,
};

const defaultProps = {
  runData: [],
};

class RunTotalsGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderGraph();
  }

  shouldComponentUpdate() {
    return false;
  }

  renderGraph() {

    const { runData, width, height, x, y } = this.props;

    // Dimensions for graph container
    const outerWidth = parseInt(width, 10);
    const outerHeight = parseInt(height, 10);
    const margin = {left: 10, top: 10, right: 10, bottom: 10};

    const xColumn = x;
    const yColumn = y;

    // Dimensions for graph
    const innerWidth = outerWidth - margin.left - margin.right;
    const innerHeight = outerHeight - margin.top - margin.bottom;

    const svg = d3.select('.runTotalsGraph').append('svg')
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    // Create group and convert x & y co-ords to index off of margins
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xAxisG = g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${innerHeight})`);

    const yAxisG = g.append('g')
      .attr('class', 'y axis');

    const xScale = d3.scale.ordinal().rangeBands([0, innerWidth]);
    const yScale = d3.scale.linear().range([innerHeight, 0]);

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    function renderGraph(data) {

      xScale.domain(data.map((d) => d[xColumn]));
      yScale.domain([0, d3.max(data, (d) => d[yColumn])]);

      xAxisG.call(xAxis);
      yAxisG.call(yAxis);

      const bars = g.selectAll('rect').data(data);

      // Generate bars for new data
      bars.enter().append('rect');

      // Update
      bars
        .attr('x', (d) => xScale(d[xColumn]))
        .attr('y', (d) => yScale(d[yColumn]))
        .attr('width', xScale.rangeBand())
        .attr('height', (d) => innerHeight - yScale(d[yColumn]));

      bars.exit().remove();
    }

    // // Construct graph
    renderGraph(runData);

  }

  render() {
    return (
      <div className="runTotalsGraph">
      </div>
    );
  }
}

RunTotalsGraph.propTypes = propTypes;
RunTotalsGraph.defaultProps = defaultProps;

export default RunTotalsGraph;
