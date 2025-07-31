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
    onChange(color.hex);
  };

  return (
    <div className="color-picker">
      <div className="color-picker-swatch" onClick={handleClick}>
        <div className="color-picker-color" style={{ backgroundColor: color }} />
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