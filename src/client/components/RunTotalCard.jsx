import React, {PropTypes} from 'react';

const propTypes = {
  title: PropTypes.string,
  runData: PropTypes.number,
};

const defaultProps = {
  runData: 0,
};

class RunTotalCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title } = this.props;

    return (
      <div className="total-card">
        <div className="total-card__title">{title}</div>
        <div className="total-card__display-value">{this.props.runData}</div>
      </div>
    );
  }
}

RunTotalCard.propTypes = propTypes;
RunTotalCard.defaultProps = defaultProps;

export default RunTotalCard;
