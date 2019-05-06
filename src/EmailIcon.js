import React from 'react';
import { IconContext } from 'react-icons';
import { FaEnvelope } from 'react-icons/fa';

export default (props) => {
  let { size } = props;
  size = size ? size : '2em'; // eslint-disable-line

  const iconContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  };

  return (
    <IconContext.Provider value={{ style: { fontSize: size } }}>
      <div style={iconContainer}>
        <FaEnvelope />
      </div>
    </IconContext.Provider>
  );
};
