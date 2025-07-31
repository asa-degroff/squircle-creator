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

## Geometry

## Squircle Generator (Superellipse)

The squircle uses a **superellipse** formula:
```
(x/a)^n + (y/b)^n = 1
```

Where:
- `a` and `b` are the semi-axes (half-width and half-height)
- `n` is the shape parameter that controls roundness

**Key geometric concepts:**

1. **Shape Parameter**: `n = 8 - cornerRoundness * 5` gives you:
   - `n = 8` (cornerRoundness = 0): Very square-like shape
   - `n = 3` (cornerRoundness = 1): More circle-like shape

2. **Parametric Generation**: Instead of solving the implicit equation directly, the code uses a parametric approach:
   - Iterate through angles from 0 to 2π
   - For each angle, calculate the corresponding point on the superellipse
   - `x = a * sign(cos θ) * |cos θ|^(2/n)`
   - `y = b * sign(sin θ) * |sin θ|^(2/n)`

3. **Coordinate Transform**: Points are shifted by `(w, h)` to center the shape at the origin, then translated to positive coordinates.

## Rounded Square Generator

This uses **quadratic Bézier curves** (Q commands in SVG):

**Geometric structure:**
1. **Straight edges**: Lines between corner regions
2. **Rounded corners**: Quadratic curves with control points at the "would-be" sharp corners
3. **Path construction**:
   - Start at top-left corner end
   - Draw line to top-right corner start
   - Draw quadratic curve around top-right corner
   - Repeat for each side

**Corner geometry**: Each corner uses a 90° quadratic Bézier where:
- Start/end points are `radius` distance from the corner
- Control point is at the sharp corner position
- This creates a smooth, circular-arc-like curve

The rounded square produces true circular arcs at corners, while the squircle creates a continuous curve with mathematically controlled "squareness" throughout the entire perimeter.

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