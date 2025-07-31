import React from 'react';
import { downloadSVG, downloadPNG } from '../utils/exportUtils';
import { generateSquirclePath, generateRoundedSquarePath } from '../utils/shapeGenerator';

function ExportButtons({ shapeConfig }) {
  const {
    shapeType,
    width,
    height,
    cornerRoundness,
    cornerRadius,
    fillColor
  } = shapeConfig;

  const createSVGElement = () => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("xmlns", svgNS);

    const path = document.createElementNS(svgNS, "path");
    const pathData = shapeType === 'squircle'
      ? generateSquirclePath(width, height, cornerRoundness)
      : generateRoundedSquarePath(width, height, cornerRadius);
    
    path.setAttribute("d", pathData);
    path.setAttribute("fill", fillColor);
    
    svg.appendChild(path);
    return svg;
  };

  const handleSVGDownload = () => {
    const svg = createSVGElement();
    const filename = `${shapeType}-${width}x${height}.svg`;
    downloadSVG(svg, filename);
  };

  const handlePNGDownload = () => {
    const svg = createSVGElement();
    const filename = `${shapeType}-${width}x${height}.png`;
    downloadPNG(svg, width, height, filename);
  };

  return (
    <div className="export-buttons">
      <button className="export-btn export-btn-svg" onClick={handleSVGDownload}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        Download SVG
      </button>
      <button className="export-btn export-btn-png" onClick={handlePNGDownload}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
        Download PNG
      </button>
    </div>
  );
}

export default ExportButtons;