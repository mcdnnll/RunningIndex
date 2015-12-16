import React, {PropTypes} from 'react';

const propTypes = {
  entries: PropTypes.array,
};

class EntryList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.entries.map((entry, index) => {
          return <p key={index}>{entry.runningIndex} - {entry.location}</p>;
        })}
      </ul>
    );
  }
}

EntryList.propTypes = propTypes;

export default EntryList;
