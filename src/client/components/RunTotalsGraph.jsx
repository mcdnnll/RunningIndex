import React, {PropTypes} from 'react';
import d3 from 'd3';
import moment from 'moment';
import d3Tip from 'd3-tip';

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
    d3.select('svg')
      .attr('width', gp.width)
      .attr('height', gp.height)
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
      .attr('transform', `translate(0, ${innerHeight})`);

    const yAxisG = g.append('g')
      .attr('class', 'y graph__axis');

    const xScale = d3.time.scale()
      .domain(d3.extent(data, (d) => d[gp.xColumn]))
      .range([0, innerWidth]);

    const yScale = d3.scale.linear()
      .domain(d3.extent(data, (d) => d[gp.yColumn]))
      .range([innerHeight, 0]);

    const colourScale = d3.scale.category20c();

    const xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .ticks(10);

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left');

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    const svg = d3.select('svg');

        // Add an x-axis label.
    svg.append('text')
      .attr('class', 'graph__x-label')
      .attr('text-anchor', 'middle')
      .attr('x', gp.width / 2)
      .attr('y', gp.height - 5)
      .text('Year');

    // Add a y-axis label.
    svg.append('text')
      .attr('class', 'graph__y-label')
      .attr('text-anchor', 'middle')
      .attr('x', -(gp.height / 2))
      .attr('y', 8)
      .attr('dy', '.5em')
      .attr('transform', 'rotate(-90)')
      .text('Running Index');

    // Apply tooltip
    const tip = d3Tip()
      .attr('class', 'graph__tooltip')
      .offset([-10, 0])
      .html((d) => {
        const tooltipMonth = '<span class="graph__tooltip-title">' + moment(d[gp.xColumn]).format("ddd DD MMM 'YY") + ': </span>';
        const tooltipAvg = '<span class="graph__tooltip-value">' + Math.round(d[gp.yColumn]) + '</span>';
        return tooltipMonth + tooltipAvg;
      });
    d3.select(this.refs.svg).call(tip);

    const scatter = g.selectAll('dot').data(data);

    // Generate bars for new data
    scatter.enter().append('circle')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // Update
    scatter
      .attr('class', 'graph__circle')
      .attr('r', 3.5)
      .attr('cx', (d) => xScale(d[gp.xColumn]))
      .attr('cy', (d) => yScale(d[gp.yColumn]))
      .attr('stroke', (d) => colourScale(d['dow']));

    scatter.exit().remove();

  }

  render() {
    return (
      <svg className="runTotalsGraph" ref="svg"></svg>
    );
  }
}

RunTotalsGraph.propTypes = propTypes;
RunTotalsGraph.defaultProps = defaultProps;

export default RunTotalsGraph;
