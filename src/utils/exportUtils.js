export function downloadSVG(svgElement, filename = 'icon.svg') {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(svgUrl);
}

export function downloadPNG(svgElement, width, height, filename = 'icon.png') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size for high quality
  const scale = 2; // For retina displays
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.scale(scale, scale);
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, width, height);
    
    canvas.toBlob(function(blob) {
      const pngUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(svgUrl);
    });
  };
  
  img.src = svgUrl;
}