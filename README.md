# JSON Tree Visualiser 🌳

Hey! This is my JSON tree visualiser built with Next.js and React Flow. It helps you see JSON data in a tree format - makes it way easier to understand big JSON files!

<img width="1917" height="829" alt="image" src="https://github.com/user-attachments/assets/76bbd743-bff1-46dd-b7ea-660f5728d221" />


## What it does

- Paste any JSON and see it as a cool tree diagram
- Different colors for different stuff (objects, arrays, etc)
- Search through the JSON using paths like $.user.name
- Drag nodes around to organize them better
- Zoom in/out to see details

## Setup

1. Clone this repo
2. Run `npm install` (might take a min)
3. Run `npm run dev`
4. Open http://localhost:3000
5. That's it!

## How to use

1. Paste your JSON in the box (or use the sample data)
2. Click "Generate Tree"
3. If you need to find something:
   - Type the path (like $.user.name)
   - Hit search
   - The node will light up in red if found

## Tech used

- Next.js (for the app)
- React Flow (for the tree diagram)
- Tailwind (for making it look nice)

## Known issues

- Sometimes the nodes overlap a bit - just drag them around to fix
- Really big JSON files might be slow
- Search only works with exact paths for now

## Todo

- [ ] Make the layout better
- [ ] Add more search options
- [ ] Maybe add a way to export the tree
- [ ] Fix the overlapping nodes issue

Made by Himesh 🚀
