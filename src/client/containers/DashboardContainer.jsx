import React, {PropTypes} from 'react';

const propTypes = {};

const defaultProps = {};

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Dashboard</div>
    );
  }
}

DashboardContainer.propTypes = propTypes;
DashboardContainer.defaultProps = defaultProps;

export default DashboardContainer;
