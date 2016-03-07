import React, { PropTypes } from 'react';
import { Grid } from './Layout';
import AddEntryModal from './AddEntryModal';
import analytics from '../utils/analytics';

const propTypes = {
  navTitle: PropTypes.object,
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

  goto(path) {
    const internalPathRegex = /^\/\w*/;
    // Check whether path is an internal view or external link
    if (internalPathRegex.test(path)) {
      this.toggleMenu();
      this.props.updateRoute(path);
    } else if (typeof window !== 'undefined') {
      analytics.trackEvent({
        category: 'Nav',
        action: 'Goto',
        label: path,
      });
      location.href = path;
    }
  }

  toggleMenu() {
    // const nav = this.refs.nav;
    const nav = document.getElementsByTagName('nav')[0];
    const menuRegex = /nav--open/gi;

    if (menuRegex.test(nav.className)) {
      nav.className = nav.className.replace(menuRegex, '');
    } else {
      nav.className += 'nav--open';
    }
  }

  render() {
    const {navTitle, navLinks} = this.props;
    const githubLink = 'https://github.com/mcdnnll/RunningIndex';

    return (
      <nav ref="nav">
        <Grid type="nav">
          <div className="nav__row">
            <span className="nav__title"><a className="nav__title-text" href={navTitle.path}>{navTitle.name}</a></span>
            <div className="nav__mobile-menu" onClick={() => this.toggleMenu()}>
              <div className="nav__mobile-menu-icon--top"></div>
              <div className="nav__mobile-menu-icon--middle"></div>
              <div className="nav__mobile-menu-icon--bottom"></div>
            </div>
            <div className="nav__list-group">
            <ul className="nav__list">
              {navLinks.map((item, i) => {
                return (
                  <li key={i} className="nav__item" onClick={() => this.goto(item.path)}>
                    <a className="nav__item-text">{item.name}</a>
                  </li>
                );
              })}
            </ul>
            <ul className="nav__list nav__list--right">
              <AddEntryModal toggleMenu={this.toggleMenu}/>
              <li className="nav__item" onClick={() => this.goto(githubLink)}>
                <a className="nav__item-text">Github</a>
              </li>
            </ul>
            </div>
          </div>
        </Grid>
      </nav>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
