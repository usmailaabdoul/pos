import React from 'react';

import './ActionButton.css';

const ActionButton = (props) => {
  const { type, text, onClickBtn } = props;

  return <div onClick={() => onClickBtn()} className={type === 'cancel' ? 'cancel-btn' : 'complete-btn'}>{text}</div>
}

export default ActionButton
