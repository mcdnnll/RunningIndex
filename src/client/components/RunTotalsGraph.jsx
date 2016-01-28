import React, {PropTypes} from 'react';
import d3 from 'd3';
import moment from 'moment';

const propTypes = {
  runData: PropTypes.array,
  handleTransitionEnd: PropTypes.func,
};

const defaultProps = {
  runData: [],
};

class RunTotalsGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { graphProps, runData} = this.props;
    this.initGraph(graphProps, runData);
    this.renderGraph(graphProps, runData);
  }

  shouldComponentUpdate(props) {
    const { graphProps, runData} = props;
    this.renderGraph(graphProps, runData);
    return false;
  }

  initGraph(gp) {
    const svg = d3.select('svg')
      .attr('width', gp.width)
      .attr('height', gp.height);

    const g = svg.append('g')
      .attr('transform', `translate(${gp.margin.left}, ${gp.margin.top})`);

  }

  renderGraph(gp, data) {

    // Dimensions for graph
    const innerWidth = gp.width - gp.margin.left - gp.margin.right;
    const innerHeight = gp.height - gp.margin.top - gp.margin.bottom;
    const dateParser = d3.time.format.iso.parse;
    const dateFormat = d3.time.format('%Y-%m-%d');

    const g = d3.select('g');

    const xAxisG = g.append('g')
      .attr('class', 'x graph-axis')
      .attr('transform', `translate(0, ${innerHeight})`);

    const yAxisG = g.append('g')
      .attr('class', 'y graph-axis');

    const xScale = d3.scale.ordinal().rangeBands([0, innerWidth], gp.barPadding);
    const yScale = d3.scale.linear().range([innerHeight, 0]);

    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickValues([]);
    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    // const dateSeries = data.map((d) => d[gp.xColumn];
    // const dateSeries = data.map((d) => moment(d[gp.xColumn]).format('DD-MM-YY'));

    const dateSeries = data.map((d) => d[gp.xColumn]);

    xScale.domain(dateSeries);
    yScale.domain([0, d3.max(data, (d) => d[gp.yColumn])]);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    const bars = g.selectAll('rect').data(data);

    // Generate bars for new data
    bars.enter().append('rect');

    // Update
    bars
      .attr('class', 'graph-bar')
      .attr('x', (d) => xScale(d[gp.xColumn]))
      .attr('y', (d) => yScale(d[gp.yColumn]))
      .attr('width', xScale.rangeBand())
      .attr('height', (d) => innerHeight - yScale(d[gp.yColumn]));

    bars.exit().remove();

  }

  render() {
    return (
      <svg className="runTotalsGraph"></svg>
    );
  }
}

RunTotalsGraph.propTypes = propTypes;
RunTotalsGraph.defaultProps = defaultProps;

export default RunTotalsGraph;
