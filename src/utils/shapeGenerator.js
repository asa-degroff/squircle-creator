export function generateSquirclePath(width, height, cornerRoundness) {
  const w = width / 2;
  const h = height / 2;
  
  // cornerRoundness: 0-1 (0 = square, 1 = circle-like)
  
  const n = 8 - cornerRoundness * 5; // Superellipse parameter (8-3, reversed)
  
  // Generate path points
  const segments = 100;
  const points = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    
    // Superellipse formula: (x/a)^n + (y/b)^n = 1
    const x = w * Math.sign(cosAngle) * Math.pow(Math.abs(cosAngle), 2/n);
    const y = h * Math.sign(sinAngle) * Math.pow(Math.abs(sinAngle), 2/n);
    
    points.push({ x: x + w, y: y + h });
  }
  
  // Convert points to SVG path
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  
  path += ' Z';
  
  return path;
}

export function generateRoundedSquarePath(width, height, cornerRadius) {
  const radius = Math.min(cornerRadius, width / 2, height / 2);
  
  return `
    M ${radius} 0
    L ${width - radius} 0
    Q ${width} 0 ${width} ${radius}
    L ${width} ${height - radius}
    Q ${width} ${height} ${width - radius} ${height}
    L ${radius} ${height}
    Q 0 ${height} 0 ${height - radius}
    L 0 ${radius}
    Q 0 0 ${radius} 0
    Z
  `.trim();
}