import React, { PropTypes } from 'react';
import { Grid } from './Layout';
import AddEntryModal from './AddEntryModal';

const propTypes = {
  navTitle: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.object),
  updateRoute: PropTypes.func,
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
    const {navTitle, navLinks} = this.props;

    return (
      <nav>
        <Grid type="nav">
          <div className="nav__row">
            <span className="nav__title"><a className="nav__title-text" href={navTitle.path}>{navTitle.name}</a></span>
            <ul className="nav__list">
              {navLinks.map((item, i) => {
                return (
                  <li key={i} className="nav__item">
                    <a className="nav__item-text" onClick={this.props.updateRoute.bind(null, item.path)}>{item.name}</a>
                  </li>
                );
              })}
            </ul>
            <ul className="nav__list nav__list--right">
              <AddEntryModal />
              <li className="nav__item">
                <a className="nav__item-text" href="https://github.com/mcdnnll/RunningIndex">Github</a>
              </li>
            </ul>
          </div>
        </Grid>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
