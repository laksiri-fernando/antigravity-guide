# Prompt

## Original Prompt

```text
Build a polished, production-quality endless runner web game inspired by Subway Surfers.

Game Concept:
A character runs forward automatically on a 3-lane track
Player can switch lanes (left/right), jump, and slide to avoid obstacles
The environment continuously scrolls to simulate forward motion

Core Gameplay:
Controls:
Left Arrow / Swipe Left → move left lane
Right Arrow / Swipe Right → move right lane
Up Arrow / Swipe Up → jump
Down Arrow / Swipe Down → slide
Smooth physics-based movement and animations
Collision detection with obstacles (game over on hit)

Game Features:
Score increases continuously over time
Speed gradually increases as score increases (difficulty scaling)
Collectible coins that increase score
Combo system for collecting coins in sequence

Power-ups:
Magnet (auto-collect coins)
Shield (one-hit protection)
Speed boost

UI / UX:
Start screen with “Press Space to Start”
Game HUD showing:
Score
High score
Coins collected
Game over screen with:
Final score
Restart button
Smooth transitions between states
Use gradients, shadows and animations
Parallax background (city / subway theme)
Character and obstacle animations
Visibility of all 3 lanes

Responsive design (mobile and desktop)

Technical Requirements:
Single-page web app (HTML, CSS, javascript)
Clean modular code structure
Use requestAnimationFrame for smooth gameplay loop
Optimize performance for smooth rendering
Handle mobile touch control
Create source code in a folder named "subway-surfer"

Encasements:
Add sound effects (jump, coin, crash)
Add background music toggle
Add leaderboard stored locally (localStorage)
Add pause/resume functionality

Polish:
Ensure no lag or jitter
Add subtle animations (hover effects, transitions)
Make the game feel fluid and engaging, not basic

Deliver a complete, ready-to-run game with clean UI and smooth gameplay
```

## ChatGPT Refined Prompt

```text
Build a polished, production-quality 3D endless runner web game inspired by Subway Surfers using modern web technologies. The final result should feel smooth, responsive, visually appealing, and commercially polished rather than a simple demo or prototype.

Game Overview

Create a fast-paced endless runner game where the player controls a continuously running character on a 3-lane track inside a subway/city-themed environment. The objective is to survive as long as possible, avoid obstacles, collect coins, and achieve a high score.

Core Gameplay Mechanics
Player Movement
Character runs forward automatically at all times
Player can:
Move left between lanes
Move right between lanes
Jump over obstacles
Slide under barriers
Movement must feel responsive and fluid with smooth interpolation and animations
Lane transitions should be animated, not instant teleports
Controls
Desktop
Left Arrow / A → move left
Right Arrow / D → move right
Up Arrow / W / Space → jump
Down Arrow / S → slide
ESC / P → pause game
Mobile
Swipe Left → move left
Swipe Right → move right
Swipe Up → jump
Swipe Down → slide
Touch controls must be smooth and reliable
Environment & World
Track System
3 clearly visible lanes at all times
Infinite procedural generation of track sections
Continuous forward movement simulation
Proper depth and perspective
Obstacles

Include multiple obstacle types such as:

Trains
Barricades
Cones
Low barriers
Moving obstacles

Obstacle spawning should:

Scale with difficulty over time
Avoid impossible situations
Maintain fair reaction timing
Visual Environment
Subway / futuristic city aesthetic
Parallax scrolling background
Dynamic lighting and shadows
Animated environmental elements
Fog/depth effects for immersion
Collectibles & Scoring
Coins
Coins appear in patterns and arcs
Coin collection should feel satisfying
Add collection sound + animation feedback
Combo multiplier for collecting consecutive coins
Score System
Score increases continuously based on:
Survival time
Distance traveled
Coins collected
Combo multiplier
Display:
Current score
High score
Coins collected
Current multiplier
Difficulty Scaling

Gradually increase:

Running speed
Obstacle frequency
Obstacle complexity
Environment intensity

Difficulty progression should feel natural and balanced.

Power-Ups

Implement the following temporary power-ups:

Magnet
Automatically attracts nearby coins
Visual magnetic effect
Shield
Protects player from one collision
Shield visual aura around character
Speed Boost
Temporarily increases movement speed
Add motion blur / speed effects

Optional additional power-ups:

Double coins
Slow motion
Hoverboard/invincibility mode
Character & Animation
Character System
Animated running cycle
Jump animation
Slide animation
Collision/crash animation
Smooth animation blending between states
Visual Feedback
Camera shake on impact
Coin pickup effects
Particle effects
Speed streaks
UI animation feedback
UI / UX Requirements
Start Menu

Include:

Game title
“Press Space to Start”
Start button
Sound/music toggle
Leaderboard button
HUD

Display:

Score
High score
Coins
Combo multiplier
Active power-ups
Pause button
Pause Menu

Include:

Resume
Restart
Sound toggle
Quit to menu
Game Over Screen

Include:

Final score
Distance traveled
Coins collected
High score
Restart button
Main menu button
Audio
Sound Effects

Add polished audio for:

Jump
Slide
Coin pickup
Power-up collection
Crash/hit
UI interactions
Background Music
Looping background soundtrack
Music toggle
Volume controls
Technical Requirements
Architecture
Single-page web application
Organized modular code structure
Separate files/modules for:
Game engine
Player controller
Obstacle manager
UI manager
Audio manager
Collision system
Performance
Use requestAnimationFrame for the main game loop
Optimize rendering for 60 FPS gameplay
Avoid memory leaks
Efficient object pooling for obstacles and coins
Responsive on both desktop and mobile
Graphics

Use:

HTML5 Canvas OR Three.js/WebGL
Modern CSS animations and transitions
Gradients, shadows, glow effects, and polished visuals
Storage

Use localStorage for:

High scores
Leaderboard
Settings
Sound preferences
Folder Structure

Generate the complete source code inside a folder named:

subway-surfer

Include:

HTML
CSS
JavaScript
Assets folder structure
README with run instructions
Quality Expectations

The game should:

Feel smooth and responsive
Have no visible lag or jitter
Include polished transitions and animations
Be visually modern and engaging
Work immediately when opened in a browser
Be production-quality rather than a minimal example
Final Deliverable

Deliver a complete, fully functional, ready-to-run endless runner game with:

Clean UI
Smooth gameplay
Responsive controls
Optimized performance
Professional visual polish
Well-structured, maintainable source code
```