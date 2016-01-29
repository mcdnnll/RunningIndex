import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Grid, Column } from '../components/Layout';
import { Table } from 'reactable';

const propTypes = {
  dataset: PropTypes.array,
};

class ManageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { dataset } = this.props;

    const itemsPerPage = 100;
    const upperPageLimit = Math.ceil(dataset.length / itemsPerPage);

    return (
      <div>
        <Grid>
          <Column type="col-1-1">
            <Table className="table"
              data={dataset}
              itemsPerPage={itemsPerPage}
              pageButtonLimit={upperPageLimit}
              sortable={true}
              defaultSort={{column: 'id', direction: 'desc'}}
              filterable={['date', 'location', 'runningIndex']}
            />
          </Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataset: state.entries.tidyDateDataset,
  };
};


ManageContainer.propTypes = propTypes;

export default connect(mapStateToProps)(ManageContainer);
