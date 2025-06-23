import React from 'react';

const ColorCircle = ({ color1, color2, size = 20 }) => {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`,
    border: '1px solid #333',
    display: 'inline-block',
    marginRight: 8,
  };

  return <span style={style}> </span>;
};

export default ColorCircle;
