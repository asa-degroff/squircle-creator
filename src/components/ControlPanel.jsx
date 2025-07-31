import React from 'react';
import ColorPicker from './ColorPicker';

function ControlPanel({
  shapeConfig,
  aspectRatioLocked,
  aspectRatio,
  maxDimension,
  onShapeTypeChange,
  onWidthChange,
  onHeightChange,
  onCornerRoundnessChange,
  onCornerRadiusChange,
  onColorChange,
  onAspectRatioToggle,
  onAspectRatioChange,
  onMaxDimensionChange
}) {
  const {
    shapeType,
    width,
    height,
    cornerRoundness,
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
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={aspectRatioLocked}
            onChange={(e) => onAspectRatioToggle(e.target.checked)}
          />
          <span style={{ marginLeft: '0.5rem' }}>Lock Aspect Ratio</span>
        </label>
      </div>

      {aspectRatioLocked ? (
        <>
          <div className="control-group">
            <label>
              Aspect Ratio
              <input
                type="text"
                className="aspect-ratio-input"
                value={aspectRatio}
                onChange={(e) => onAspectRatioChange(e.target.value)}
                placeholder="e.g., 1:1, 4:3, 16:9"
              />
            </label>
            <small>Format: width:height (e.g., 1:1, 4:3, 16:9)</small>
          </div>

          <div className="control-group">
            <label>
              Size: {maxDimension}px
              <input
                type="range"
                min="32"
                max="512"
                value={maxDimension}
                onChange={(e) => onMaxDimensionChange(Number(e.target.value))}
              />
            </label>
            <small>Dimensions: {width} × {height}px</small>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}

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