import React, { PropTypes } from 'react';
import Nav from '../components/Nav';
import { Column, Grid } from '../components/Layout';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { fetchDataset } from '../actions/entryActions';

const propTypes = {
  dataset: PropTypes.array,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node,
  ]),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataset());
  }

  handleRouteChange(nextRoute) {
    this.props.dispatch(routeActions.push(nextRoute));
  }

  render() {
    const navTitle = {
      name: 'RunningIndex', path: '/',
    };

    const navLinks = [
      {name: 'Dashboard', path: '/'},
      {name: 'Manage Entries', path: '/manage'},
    ];

    // Attach dataset to any of the child containers that are to be rendered
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { dataset: this.props.dataset });
    });

    return (
      <div>
        <Nav
          navTitle={navTitle}
          navLinks={navLinks}
          updateRoute={this.handleRouteChange}
        />
        <Grid type="padded">
          <Column type="col-10-12 push-1-12">
            {childrenWithProps}
          </Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dataset: state.dataset,
  };
};

App.propTypes = propTypes;

export default connect(mapStateToProps)(App);
