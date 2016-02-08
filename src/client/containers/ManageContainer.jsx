import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Grid, Column } from '../components/Layout';
import { Table } from 'reactable';
import { fetchDataset } from '../actions/entryActions';
import Spinner from '../components/Spinner';

const propTypes = {
  dataset: PropTypes.array,
  datasetIsLoading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  dataset: [],
  datasetIsLoading: false,
};

class ManageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  // Only fetch data if the user refreshes the page manually.
  // Data will otherwise come from the same dataset loaded
  // for the dashboard.
  componentDidMount() {
    if (this.props.dataset.length === 0) {
      const { dispatch } = this.props;
      dispatch(fetchDataset());
    }
  }

  renderSpinner() {
    return <Spinner />;
  }

  renderTable() {
    const { dataset } = this.props;

    const itemsPerPage = 100;
    const upperPageLimit = Math.ceil(dataset.length / itemsPerPage);

    const tableColumns = [
      {key: 'tidyDate', label: 'Date'},
      {key: 'runningIndex', label: 'Running Index'},
      {key: 'location', label: 'Location'},
    ];

    return (
      <Grid>
          <Column type="col-1-1">
            <Table className="entryTable"
              data={dataset}
              columns={tableColumns}
              filterPlaceholder="Search Entries"
              itemsPerPage={itemsPerPage}
              pageButtonLimit={upperPageLimit}
              sortable={true}
              defaultSort={{column: 'date', direction: 'desc'}}
              filterable={['date', 'location', 'runningIndex']}
            />
          </Column>
        </Grid>
    );
  }

  render() {

    return (
      <div>
        {this.props.datasetIsLoading ? this.renderSpinner() : this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataset: state.entries.dataset,
    datasetIsLoading: state.entries.datasetIsLoading,
  };
};

ManageContainer.propTypes = propTypes;
ManageContainer.defaultProps = defaultProps;

export default connect(mapStateToProps)(ManageContainer);
