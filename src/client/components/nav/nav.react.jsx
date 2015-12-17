import React, {PropTypes} from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const navItems = [
      {name: 'Dashboard', path: '/'},
      {name: 'Statistics', path: '/statistics'},
      {name: 'Manage Entries', path: '/manage'},
    ];

    return (
      <nav>
        <ul>
          {navItems.map((item, i) => {
            return <li key={i}><a href={item.path}>{item.name}</a></li>;
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
