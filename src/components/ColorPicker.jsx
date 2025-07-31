import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker({ color, onChange }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    // Use rgba format to support transparency
    const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    onChange(rgba);
  };

  return (
    <div className="color-picker">
      <div className="color-picker-swatch" onClick={handleClick}>
        <div className="color-picker-color">
          <div style={{ 
            backgroundColor: color,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '0.25rem'
          }} />
        </div>
      </div>
      {displayColorPicker ? (
        <div className="color-picker-popover">
          <div className="color-picker-cover" onClick={handleClose} />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;