import React, {PropTypes} from 'react';
import AddEntryContainer from '../containers/AddEntryContainer';
import Modal from 'react-modal';

const propTypes = {};

class AddEntryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalIsOpen: false};
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
        <a className="nav__item nav__item--right" onClick={this.openModal}>+ Add</a>
        <Modal style={customStyles} isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <AddEntryContainer handleCloseModal={this.closeModal}/>
        </Modal>
      </li>
    );
  }
}

AddEntryModal.propTypes = propTypes;

export default AddEntryModal;
