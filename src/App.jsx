import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import ShapePreview from './components/ShapePreview';
import ExportButtons from './components/ExportButtons';

function App() {
  const [shapeType, setShapeType] = useState('squircle');
  const [width, setWidth] = useState(256);
  const [height, setHeight] = useState(256);
  const [cornerRoundness, setCornerRoundness] = useState(0.5);
  const [cornerRadius, setCornerRadius] = useState(32);
  const [fillColor, setFillColor] = useState('#4F46E5');
  const [aspectRatioLocked, setAspectRatioLocked] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [maxDimension, setMaxDimension] = useState(256);

  // Parse aspect ratio and calculate dimensions
  const parseAspectRatio = (ratioString) => {
    const parts = ratioString.split(':').map(p => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[0] > 0 && parts[1] > 0) {
      return { width: parts[0], height: parts[1] };
    }
    return { width: 1, height: 1 }; // Default to 1:1 if invalid
  };

  const updateDimensionsFromMaxDimension = (maxDim) => {
    if (aspectRatioLocked) {
      const ratio = parseAspectRatio(aspectRatio);
      const aspectRatioValue = ratio.width / ratio.height;
      
      let newWidth, newHeight;
      if (aspectRatioValue >= 1) {
        // Width is the longer dimension
        newWidth = maxDim;
        newHeight = Math.round(maxDim / aspectRatioValue);
      } else {
        // Height is the longer dimension
        newHeight = maxDim;
        newWidth = Math.round(maxDim * aspectRatioValue);
      }
      
      setWidth(newWidth);
      setHeight(newHeight);
      setMaxDimension(maxDim);
    }
  };

  const handleAspectRatioToggle = (locked) => {
    setAspectRatioLocked(locked);
    if (locked) {
      // When locking, set max dimension to the current larger dimension
      const currentMax = Math.max(width, height);
      setMaxDimension(currentMax);
      updateDimensionsFromMaxDimension(currentMax);
    }
  };

  const handleAspectRatioChange = (newRatio) => {
    setAspectRatio(newRatio);
    if (aspectRatioLocked) {
      updateDimensionsFromMaxDimension(maxDimension);
    }
  };

  const shapeConfig = {
    shapeType,
    width,
    height,
    cornerRoundness,
    cornerRadius,
    fillColor
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Squircle Icon Generator</h1>
        <p>Create customizable squircle and rounded square icons</p>
      </div>
      
      <div className="app-content">
        <ControlPanel
          shapeConfig={shapeConfig}
          aspectRatioLocked={aspectRatioLocked}
          aspectRatio={aspectRatio}
          maxDimension={maxDimension}
          onShapeTypeChange={setShapeType}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onCornerRoundnessChange={setCornerRoundness}
          onCornerRadiusChange={setCornerRadius}
          onColorChange={setFillColor}
          onAspectRatioToggle={handleAspectRatioToggle}
          onAspectRatioChange={handleAspectRatioChange}
          onMaxDimensionChange={updateDimensionsFromMaxDimension}
        />
        
        <div className="preview-section">
          <ShapePreview {...shapeConfig} />
          <ExportButtons shapeConfig={shapeConfig} />
        </div>
      </div>
    </div>
  );
}

export default App;