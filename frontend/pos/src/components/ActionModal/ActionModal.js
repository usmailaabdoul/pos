import React from 'react';
import Modal from 'react-modal';

import './ActionModal.css';

const ActionModal = (props) => {
  const { isVisible, setIsVisible, children } = props;

  return (
    <Modal
      isOpen={isVisible}
      closeTimeoutMS={200}
      onRequestClose={() => setIsVisible(false)}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >

      <div className="d-flex justify-content-between align-items-center action-modal-header p-3 h5">
        <div>Confirm</div>
        <div onClick={() => setIsVisible(false)} className="x">x</div>
      </div>

      <div className="justify-content-center align-items-center my-5">
        {children}
      </div>
    </Modal>
  )
}

export default ActionModal;

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)'
  },
  content: {
    top: '30%',
    left: '30%',
    right: '30%',
    bottom: '30%',
    border: 'transparent',
    background: '#fcfbfb',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '0px',
  }
};