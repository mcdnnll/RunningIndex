import React, {PropTypes} from 'react';

const propTypes = {};

const defaultProps = {};

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg width="10" height="10">
        <path d="M0,1 10,1" stroke="#000" stroke-width="2"/>
        <path d="M0,5 10,5" stroke="#000" stroke-width="2"/>
        <path d="M0,9 10,9" stroke="#000" stroke-width="2"/>
      </svg>
    );
  }
}

NavMenu.propTypes = propTypes;
NavMenu.defaultProps = defaultProps;

export default NavMenu;
