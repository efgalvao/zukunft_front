import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

export default Modal;
