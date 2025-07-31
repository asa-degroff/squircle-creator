import React from 'react';
import ColorPicker from './ColorPicker';

function ControlPanel({
  shapeConfig,
  onShapeTypeChange,
  onWidthChange,
  onHeightChange,
  onCornerRoundnessChange,
  onFlatSideLengthChange,
  onCornerRadiusChange,
  onColorChange
}) {
  const {
    shapeType,
    width,
    height,
    cornerRoundness,
    flatSideLength,
    cornerRadius,
    fillColor
  } = shapeConfig;

  return (
    <div className="control-panel">
      <div className="control-group">
        <label>Shape Type</label>
        <div className="shape-type-buttons">
          <button
            className={`shape-type-btn ${shapeType === 'squircle' ? 'active' : ''}`}
            onClick={() => onShapeTypeChange('squircle')}
          >
            Squircle
          </button>
          <button
            className={`shape-type-btn ${shapeType === 'rounded-square' ? 'active' : ''}`}
            onClick={() => onShapeTypeChange('rounded-square')}
          >
            Rounded Square
          </button>
        </div>
      </div>

      <div className="control-group">
        <label>
          Width: {width}px
          <input
            type="range"
            min="32"
            max="512"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="control-group">
        <label>
          Height: {height}px
          <input
            type="range"
            min="32"
            max="512"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
          />
        </label>
      </div>

      {shapeType === 'squircle' ? (
        <>
          <div className="control-group">
            <label>
              Corner Roundness: {Math.round(cornerRoundness * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={cornerRoundness}
                onChange={(e) => onCornerRoundnessChange(Number(e.target.value))}
              />
            </label>
            <small>0% = Square corners, 100% = Circle-like corners</small>
          </div>

          <div className="control-group">
            <label>
              Flat Side Length: {Math.round(flatSideLength * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={flatSideLength}
                onChange={(e) => onFlatSideLengthChange(Number(e.target.value))}
              />
            </label>
            <small>0% = No flat sides, 100% = Maximum flat sides</small>
          </div>
        </>
      ) : (
        <div className="control-group">
          <label>
            Corner Radius: {cornerRadius}px
            <input
              type="range"
              min="0"
              max={Math.min(width, height) / 2}
              value={cornerRadius}
              onChange={(e) => onCornerRadiusChange(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      <div className="control-group">
        <label>Fill Color</label>
        <ColorPicker color={fillColor} onChange={onColorChange} />
      </div>
    </div>
  );
}

export default ControlPanel;