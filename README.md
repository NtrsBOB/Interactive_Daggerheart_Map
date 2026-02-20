# Interactive Daggerheart Map

An offline-first interactive map for the **Daggerheart** TTRPG setting (Sylvakar kingdom). No installs, no server, no dependencies — open the app in any browser and it works immediately.

## Quick start

Open **index.html** in any browser. The map and locations work right away.

## Files

| File | Purpose |
|------|---------|
| **index.html** | Main map app. Open this in a browser. |
| **convert.html** | Converts locations.md to the `LOCATIONS` array for pasting into index.html. |
| **locations.md** | Editable list of locations: names, categories, positions (pixel coordinates), and descriptions. |
| **Map.png** | Map image used by the app. |

## Editing locations

**You only edit locations.md.** Names, descriptions, and positions (pixel coordinates from the map image) live there.

- **When testing locally with a server:** If you run a local server (e.g. `npx serve`, or VS Code Live Server) and open the app from that, the app will fetch **locations.md** automatically. You don’t need to run the convert step for local testing.
- **When sharing with players:** Use the convert step so the map works from a file or any host. Open **convert.html**, paste the contents of locations.md, click Convert, then copy the generated `LOCATIONS` array and replace the same array in **index.html** (search for `LOCATIONS =`). After that, the updated index.html (and Map.png) is what you send to players.

Alternatively, run `node build.js` (see below) to inject locations into index.html without copy-paste.

## What you get

- **Map**: Zoom (mouse wheel or +/−), pan (drag). Uses **Map.png** in this folder.
- **Locations**: Right panel lists all locations by category. Click one to see its description in the detail panel. Set `Position: x, y` (pixels from the map image) in locations.md to show pins on the map; use multiple `Position:` lines for polylines (borders, routes).
- **Add pin**: Click “Add Pins”, then click on the map to place a custom marker (optional label). Stored in your browser only (localStorage).

## Sharing with players

Send **index.html** and **Map.png** (and optionally locations.md for your own editing). Players double‑click index.html — no server, no extra steps. Custom pins they add are saved only on their device.

## Changing the map image

To use a different map image, replace **Map.png** with your file (same name), or edit index.html and change the `src` of the map image (search for `Map.png`). Other map files in this folder (e.g. Map_colored.png) are not used by default; you can swap them in the same way.

## Adding new categories

Locations are grouped by the `## Section` headers in locations.md. New sections you add there will appear in the sidebar automatically; you don’t need to change index.html. The order of categories in the list follows a default order, then any additional categories.

## Build script (optional)

To update the embedded locations in index.html without manual copy-paste:

```bash
node build.js
```

This reads **locations.md**, parses it, and injects the `LOCATIONS` array into **index.html**. You still need to send index.html and Map.png to players.
