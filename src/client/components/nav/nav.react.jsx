import React, {PropTypes} from 'react';
import {Grid, Column} from '../core/layout/grid.react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const navTitle = {
      name: 'RunningIndex', path: '/',
    };

    const navItems = [
      {name: 'Dashboard', path: '/'},
      {name: 'Statistics', path: '/statistics'},
      {name: 'Manage Entries', path: '/manage'},
    ];

    return (
      <nav className="nav">
        <Grid type="nav">
            <a className="nav__title" href={navTitle.path}>{navTitle.name}</a>
            <ul className="nav__row">
              {navItems.map((item, i) => {
                return (
                  <li key={i} className="nav__list">
                    <a className="nav__item" href={item.path}>{item.name}</a>
                  </li>
                );
              })}
            </ul>
        </Grid>
      </nav>
    );
  }
}

export default Nav;
