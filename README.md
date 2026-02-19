# Interactive Daggerheart Map

Open **index.html** in any browser to use the map. No installs or server required.

## What you get

- **Map**: Zoom (mouse wheel or +/−), pan (drag). Uses `Map.png` in this folder.
- **Locations**: Right panel lists all locations by category. Click one to see its description. When you set positions in `locations.md` (x, y as 0–100) and re-import, pins appear on the map.
- **Add pin**: Click “Add pin”, then click on the map to place a custom marker (optional label). Stored in your browser only (localStorage).

## Updating locations

1. Edit **locations.md** (names, descriptions, and optional `Position: x, y` per location).
2. Open **convert.html** in a browser, paste the contents of `locations.md`, click Convert.
3. Copy the generated `LOCATIONS` array and replace the existing `const LOCATIONS = [ ... ];` in **index.html** (search for `const LOCATIONS`).

## Sharing with players

Zip this folder (index.html, Map.png, locations.md, convert.html) and send it. Players double-click **index.html** to open the map. Custom pins they add are saved only on their device.
