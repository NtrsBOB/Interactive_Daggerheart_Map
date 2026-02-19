# Interactive Daggerheart Map

Open **index.html** in any browser. No installs, no server, nothing to provide — the map and locations work immediately.

## Editing locations

**You only edit locations.md.** Names, descriptions, and positions (pixel coordinates from the map image) live there. The map has a built-in copy of that data so players see everything as soon as they open the page.

When you change **locations.md** and want the map to show the updates: open **convert.html**, paste the contents of locations.md, click Convert, then copy the generated `LOCATIONS` array and replace the same array in **index.html** (search for `let LOCATIONS =`). After that, the updated index.html (and Map.png) is what you send to players.

## What you get

- **Map**: Zoom (mouse wheel or +/−), pan (drag). Uses **Map.png** in this folder.
- **Locations**: Right panel lists all locations from locations.md. Click one to see its description in the panel to the left of the list. Set `Position: x, y` (pixels from the map image) in locations.md to show pins on the map.
- **Add pin**: Click “Add pin”, then click on the map to place a custom marker (optional label). Stored in your browser only (localStorage).

## Sharing with players

Send **index.html** and **Map.png** (and optionally locations.md for your own editing). Players double‑click index.html — no drop, no extra steps. Custom pins they add are saved only on their device.
