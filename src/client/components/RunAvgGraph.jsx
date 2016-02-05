import React, {PropTypes} from 'react';
import d3 from 'd3';
const propTypes = {
  runData: PropTypes.array,
};

const defaultProps = {};

class RunAvgGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { graphProps, runData } = this.props;
    this.initGraph(graphProps);
    this.renderGraph(graphProps, runData);
  }

  shouldComponentUpdate(props) {
    const { graphProps, runData} = props;
    this.renderGraph(graphProps, runData);
    return false;
  }

  initGraph(gp) {
    d3.select('svg')
      .attr('width', gp.width)
      .attr('height', gp.height)

      // Append group element as child to svg and add offset
      .append('g')
      .attr('transform', `translate(${gp.margin.left}, ${gp.margin.top})`);
  }

  renderGraph(gp, data) {

    // Dimensions for graph
    const innerWidth = gp.width - gp.margin.left - gp.margin.right;
    const innerHeight = gp.height - gp.margin.top - gp.margin.bottom;

    const g = d3.select('g');
    const xAxisG = g.append('g')
      .attr('class', 'x graph-axis')
      // Translate starting position of X axis
      .attr('transform', `translate(0, ${innerHeight})`);

    const yAxisG = g.append('g')
      .attr('class', 'y graph-axis');

    // Scales must stay within graph's container
    const xScale = d3.time.scale()
      // Dynamically find Min, Max from dataset
      .domain(d3.extent(data, (d) => d[gp.xColumn]))
      .range([0, innerWidth]);

    const yScale = d3.scale.linear()
      .domain([0, 100])
      .range([innerHeight, 0]);

    // Configure Axes
    const xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(d3.time.year, 1)
      .tickFormat(d3.time.format('%Y'));

    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    // Apply axes to their respective grouping
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    // Generate bars for new data
    const bars = g.selectAll('rect').data(data);
    bars.enter().append('rect');

    // Update
    bars
      .attr('class', 'graph-bar')
      .attr('width', innerWidth / (data.length * 1.5))
      .attr('x', (d) => {
        return xScale(d[gp.xColumn] - innerWidth / data.length);
      })
      .attr('y', innerHeight)
      .attr('height', 0)
      .transition().duration(1000)
      .attr('y', (d) => yScale(d[gp.yColumn]))
      .attr('height', (d) => innerHeight - yScale(d[gp.yColumn]));

    bars.exit().remove();

  }

  render() {
    return (
      <svg className="runTotalsGraph"></svg>
    );
  }
}

RunAvgGraph.propTypes = propTypes;
RunAvgGraph.defaultProps = defaultProps;

export default RunAvgGraph;
