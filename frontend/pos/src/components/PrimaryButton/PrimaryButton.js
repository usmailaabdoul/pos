import React from 'react';

import './PrimaryButton.css';

const PrimaryButton = (props) => {
  const { title, onClick, icon } = props;
  return (
    <button className="items-btn text-center btn btn-primary" onClick={() => onClick()}>{title}</button>
  );
};

export default PrimaryButton