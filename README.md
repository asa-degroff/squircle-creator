# Squircle Icon Generator

A web-based tool for creating customizable squircle and rounded square icons. Perfect for app developers and web designers who need high-quality icon templates with specific shapes.

## Features

- **Shape Types**
  - **Squircle**: A superellipse-based shape with smooth, continuous curves
  - **Rounded Square**: Traditional rounded rectangle shape

- **Customization Options**
  - **Dimensions**: 
    - Manual mode: Adjust width and height independently (32-512px)
    - Aspect ratio lock: Set a fixed aspect ratio (e.g., 1:1, 4:3, 16:9) and control size with a single slider
  - **Squircle Parameters**:
    - Corner roundness (0-100%): Controls how round the corners are
  - **Rounded Square Parameters**:
    - Corner radius: Adjustable radius for rounded corners
  - **Color**: Full color picker with hex color support

- **Export Formats**
  - **SVG**: Scalable vector graphics for perfect quality at any size
  - **PNG**: High-resolution raster images (2x scale for retina displays)

## Installation

```bash
# Clone the repository
git clone https://github.com/asa-degroff/squircle-creator.git
cd squircle-creator

# Install dependencies
npm install
```

## Development

```bash
# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. Launch the application with `npm run dev`
2. Select your desired shape type (Squircle or Rounded Square)
3. Set dimensions:
   - **Manual mode**: Adjust width and height independently using separate sliders
   - **Aspect ratio lock**: Check "Lock Aspect Ratio", enter your desired ratio (e.g., 1:1, 4:3, 16:9), and use a single slider to control the size
4. Fine-tune the shape parameters:
   - For Squircle: Adjust corner roundness
   - For Rounded Square: Adjust the corner radius
5. Choose a fill color using the color picker
6. Preview your icon in real-time
7. Download your icon as SVG or PNG

## Technical Details

- **Framework**: React 19 with Vite
- **Styling**: Custom CSS with responsive design
- **Color Picker**: react-color (ChromePicker)
- **Shape Generation**: Mathematical formulas for squircle paths using superellipse equations
- **Export**: Native browser APIs for SVG/PNG generation and download

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- SVG
- Canvas API
- Blob URLs

## License

MIT