import React from 'react';

import './PrimaryButton.css';

const PrimaryButton = (props) => {
  const { title, onClick, icon } = props;
  return (
    <div className="items-btn text-center" onClick={() => onClick()}>{title}</div>
  );
};

export default PrimaryButton