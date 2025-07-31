import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import ShapePreview from './components/ShapePreview';
import ExportButtons from './components/ExportButtons';

function App() {
  const [shapeType, setShapeType] = useState('squircle');
  const [width, setWidth] = useState(256);
  const [height, setHeight] = useState(256);
  const [cornerRoundness, setCornerRoundness] = useState(0.5);
  const [flatSideLength, setFlatSideLength] = useState(0.7);
  const [cornerRadius, setCornerRadius] = useState(32);
  const [fillColor, setFillColor] = useState('#4F46E5');

  const shapeConfig = {
    shapeType,
    width,
    height,
    cornerRoundness,
    flatSideLength,
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
          onShapeTypeChange={setShapeType}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
          onCornerRoundnessChange={setCornerRoundness}
          onFlatSideLengthChange={setFlatSideLength}
          onCornerRadiusChange={setCornerRadius}
          onColorChange={setFillColor}
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