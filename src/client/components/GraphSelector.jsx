import React, {PropTypes} from 'react';

const propTypes = {
  currentView: PropTypes.string,
  changeView: PropTypes.func,
};

const defaultProps = {
};

class GraphSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  // Append active class to button on selection to apply css styling
  checkIsActive(selectedView) {
    if (this.props.currentView === selectedView) {
      return 'selector__btn--active';
    }

    // Return empty string to avoid appending undefined to class name
    return '';
  }

  render() {
    const { changeView } = this.props;

    return (
      <div className="selector__btn-group">
          <button className={'selector__btn selector__btn-left ' + this.checkIsActive('MONTHLY_AVG')}
            onClick={changeView.bind(this, 'MONTHLY_AVG')}>Monthly Avg</button>
          <button className={'selector__btn selector__btn-right ' + this.checkIsActive('TOTAL')}
            onClick={changeView.bind(this, 'TOTAL')}>Total</button>
      </div>
    );
  }
}

GraphSelector.propTypes = propTypes;
GraphSelector.defaultProps = defaultProps;

export default GraphSelector;
