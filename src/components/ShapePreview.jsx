import React, { useRef } from 'react';
import { generateSquirclePath, generateRoundedSquarePath } from '../utils/shapeGenerator';

function ShapePreview({
  shapeType,
  width,
  height,
  cornerRoundness,
  flatSideLength,
  cornerRadius,
  fillColor
}) {
  const svgRef = useRef(null);

  const path = shapeType === 'squircle'
    ? generateSquirclePath(width, height, cornerRoundness, flatSideLength)
    : generateRoundedSquarePath(width, height, cornerRadius);

  return (
    <div className="shape-preview">
      <div className="preview-container">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          <path
            d={path}
            fill={fillColor}
          />
        </svg>
      </div>
      <div className="preview-info">
        <p>{width} × {height}px</p>
      </div>
    </div>
  );
}

export default ShapePreview;