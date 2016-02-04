import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import AddEntryContainer from '../containers/AddEntryContainer';
import Modal from 'react-modal';
import { openModal, closeModal } from '../actions/uiActions';

const propTypes = {};

class AddEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    const { dispatch } = this.props;
    dispatch(openModal());
    // this.setState({modalIsOpen: true});
  }

  handleCloseModal() {
    const { dispatch } = this.props;
    dispatch(closeModal());
    // this.setState({modalIsOpen: false});
  }

  render() {

    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(214, 214, 214, 0.85)',
      },
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <li className="nav__list nav__list--right">
        <a className="nav__item nav__item--right" onClick={this.handleOpenModal}>+ Add</a>
        <Modal style={customStyles} isOpen={this.props.modalIsOpen} onRequestClose={this.handleCloseModal}>
            <AddEntryContainer handleCloseModal={this.handleCloseModal}/>
        </Modal>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalIsOpen: state.ui.modalIsOpen,
  };
};

AddEntryModal.propTypes = propTypes;

export default connect(mapStateToProps)(AddEntryModal);
