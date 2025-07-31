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
    fillColor,
    padding
  } = shapeConfig;

  const createSVGElement = () => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    
    // Calculate dimensions with padding
    const paddingAmount = Math.max(width, height) * (padding / 100);
    const totalWidth = width + paddingAmount * 2;
    const totalHeight = height + paddingAmount * 2;
    
    svg.setAttribute("width", totalWidth);
    svg.setAttribute("height", totalHeight);
    svg.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);
    svg.setAttribute("xmlns", svgNS);

    // Create a group for the shape with padding offset
    const g = document.createElementNS(svgNS, "g");
    g.setAttribute("transform", `translate(${paddingAmount}, ${paddingAmount})`);

    const path = document.createElementNS(svgNS, "path");
    const pathData = shapeType === 'squircle'
      ? generateSquirclePath(width, height, cornerRoundness)
      : generateRoundedSquarePath(width, height, cornerRadius);
    
    path.setAttribute("d", pathData);
    path.setAttribute("fill", fillColor);
    
    g.appendChild(path);
    svg.appendChild(g);
    return svg;
  };

  const handleSVGDownload = () => {
    const svg = createSVGElement();
    const paddingAmount = Math.max(width, height) * (padding / 100);
    const totalWidth = Math.round(width + paddingAmount * 2);
    const totalHeight = Math.round(height + paddingAmount * 2);
    const filename = padding > 0 
      ? `${shapeType}-${width}x${height}-pad${padding}.svg`
      : `${shapeType}-${width}x${height}.svg`;
    downloadSVG(svg, filename);
  };

  const handlePNGDownload = () => {
    const svg = createSVGElement();
    const paddingAmount = Math.max(width, height) * (padding / 100);
    const totalWidth = Math.round(width + paddingAmount * 2);
    const totalHeight = Math.round(height + paddingAmount * 2);
    const filename = padding > 0 
      ? `${shapeType}-${width}x${height}-pad${padding}.png`
      : `${shapeType}-${width}x${height}.png`;
    downloadPNG(svg, totalWidth, totalHeight, filename);
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