# Cyber Runner (Subway Surfer Clone)

A polished, fast-paced 3D endless runner game built entirely with modern web technologies (HTML5, CSS3, ES Modules, and Three.js).

## Features
- **3D Graphics**: Built using Three.js with dynamic lighting, shadows, and fog.
- **Procedural Generation**: Infinite track with randomly spawning obstacles and coin arcs.
- **Controls**: Fully responsive desktop and mobile touch (swipe) controls.
- **Audio**: Synthesized procedural sound effects and background music using the Web Audio API.
- **Storage**: LocalStorage integration for high score persistence.
- **Modular Codebase**: Clean, maintainable architecture separated into logical JS modules.

## How to Play

### Controls
**Desktop:**
- **Move Left:** Left Arrow / A
- **Move Right:** Right Arrow / D
- **Jump:** Up Arrow / W / Space
- **Slide:** Down Arrow / S
- **Pause:** ESC / P

**Mobile:**
- **Move:** Swipe Left / Right
- **Jump:** Swipe Up
- **Slide:** Swipe Down

### Objective
Survive as long as possible! Dodge the neon pink obstacles (jump over the low ones, slide under the tall ones, or switch lanes to avoid them entirely). Collect yellow coins to increase your score multiplier and boost your total score. The game gradually speeds up the longer you survive.

## Setup & Run Instructions

Because this game uses standard ES Modules (`<script type="module">`), it must be served via a local web server (opening the file directly via `file://` will cause CORS errors due to module loading).

**Option 1: Using Node.js/npx (Recommended)**
```bash
npx serve
# or
npx http-server
```

**Option 2: Using Python**
```bash
python3 -m http.server
```

Once the server is running, navigate to the provided localhost URL (e.g., `http://localhost:3000`) in your browser to play!
