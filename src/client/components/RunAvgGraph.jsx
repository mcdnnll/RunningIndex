import React, {PropTypes} from 'react';
import d3 from 'd3';
import d3Tip from 'd3-tip';
import moment from 'moment';

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
      .attr('class', 'x graph__axis')
      // Translate starting position of X axis
      .attr('transform', `translate(0, ${innerHeight})`);

    const yAxisG = g.append('g')
      .attr('class', 'y graph__axis');

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

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    // Apply axes to their respective grouping
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    const svg = d3.select('svg');

    // Add an x-axis label.
    svg.append('text')
      .attr('class', 'graph__x-label')
      .attr('text-anchor', 'middle')
      .attr('x', gp.width / 2)
      .attr('y', gp.height - 5)
      .text('Year (Month)');

    // Add a y-axis label.
    svg.append('text')
      .attr('class', 'graph__y-label')
      .attr('text-anchor', 'middle')
      .attr('x', -(gp.height / 2))
      .attr('y', 8)
      .attr('dy', '.5em')
      .attr('transform', 'rotate(-90)')
      .text('Running Index (Average)');

    // Apply tooltip
    const tip = d3Tip()
      .attr('class', 'graph__tooltip')
      .offset([-10, 0])
      .html((d) => {
        const tooltipMonth = '<span class="graph__tooltip-title">' + moment(d[gp.xColumn]).format("MMM 'YY") + ': </span>';
        const tooltipAvg = '<span class="graph__tooltip-value">' + Math.round(d[gp.yColumn]) + '</span>';
        return tooltipMonth + tooltipAvg;
      });
    d3.select(this.refs.svg).call(tip);

    // Generate bars for new data
    const bars = g.selectAll('rect').data(data);
    bars.enter().append('rect')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // Update
    bars
      .attr('class', 'graph__bar')
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
      <svg className="runTotalsGraph" ref="svg"></svg>
    );
  }
}

RunAvgGraph.propTypes = propTypes;
RunAvgGraph.defaultProps = defaultProps;

export default RunAvgGraph;
