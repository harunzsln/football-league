import React from 'react';

const ColorCircle = ({ color1, color2, className }) => { 
  const style = {
    background: `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`,
  
  };

  return (

    <div className={className} style={style}></div>
  );
};

export default ColorCircle;