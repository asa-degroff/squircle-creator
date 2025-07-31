import React, { useRef } from 'react';
import { generateSquirclePath, generateRoundedSquarePath } from '../utils/shapeGenerator';

function ShapePreview({
  shapeType,
  width,
  height,
  cornerRoundness,
  cornerRadius,
  fillColor,
  padding
}) {
  const svgRef = useRef(null);

  // Calculate dimensions with padding
  const paddingAmount = Math.max(width, height) * (padding / 100);
  const totalWidth = width + paddingAmount * 2;
  const totalHeight = height + paddingAmount * 2;

  const path = shapeType === 'squircle'
    ? generateSquirclePath(width, height, cornerRoundness)
    : generateRoundedSquarePath(width, height, cornerRadius);

  return (
    <div className="shape-preview">
      <div className="preview-container">
        <svg
          ref={svgRef}
          width={totalWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{ maxWidth: '100%', height: 'auto' }}
        >
          {/* Background to show padding area */}
          <rect
            x="0"
            y="0"
            width={totalWidth}
            height={totalHeight}
            fill="rgba(0, 0, 0, 0.05)"
            stroke="rgba(0, 0, 0, 0.1)"
            strokeWidth="1"
            strokeDasharray="4"
          />
          
          {/* The actual shape centered with padding */}
          <g transform={`translate(${paddingAmount}, ${paddingAmount})`}>
            <path
              d={path}
              fill={fillColor}
            />
          </g>
        </svg>
      </div>
      <div className="preview-info">
        <p>Shape: {width} × {height}px</p>
        {padding > 0 && <p>Canvas: {Math.round(totalWidth)} × {Math.round(totalHeight)}px</p>}
      </div>
    </div>
  );
}

export default ShapePreview;