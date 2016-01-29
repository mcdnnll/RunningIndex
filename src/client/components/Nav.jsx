import React, { PropTypes } from 'react';
import { Grid, Column } from './Layout';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {navTitle, navLinks} = this.props;

    return (
      <nav className="nav">
        <Grid type="nav">
            <a className="nav__title" href={this.props.navTitle.path}>{this.props.navTitle.name}</a>
            <ul className="nav__row">
              {this.props.navLinks.map((item, i) => {
                return (
                  <li key={i} className="nav__list">
                    <a className="nav__item" onClick={this.props.updateRoute.bind(null, item.path)}>{item.name}</a>
                  </li>
                );
              })}
            </ul>
        </Grid>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
