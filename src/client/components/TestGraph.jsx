import React from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

class TestGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    d3.select(this.refs.graph)
      .append('circle')
      .call(this.update(this.props));
  }

  shouldComponentUpdate(props) {
    d3.select(this.refs.graph)
      .select('circle')
      .call(this.update(props));

    // always skip React's render step
    return false;
  }

  update(props) {
    return function(me) {
      me
      .attr('cx', 3 + props.r)
      .attr('cy', 3 + props.r)
      .attr('r', props.r)
      .attr('fill', props.color);
    };
  }

  render() {
    const {width, height, x, y} = this.props;
    return (
      <svg width={width} height={height} ref="graph"></svg>
    );
  }
}

export default TestGraph;
