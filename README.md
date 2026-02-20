# Interactive Daggerheart Map

An **offline-first** interactive map for the **Daggerheart** TTRPG setting — the **Kingdom of Sylvakar**. One HTML file plus a map image; no install, no server, no dependencies. Open in any browser and it works. Players can pan, zoom, browse locations (cities, settlements, points of interest), measure distances (scale: Sanji–To'Acar ≈ 24 miles), and add their own pins (stored in the browser only).

---

**Step-by-step guide** — See **INSTRUCTIONS.md**. **Note:** If you only edit **locations.md** and open the map via a local server (e.g. Live Server, `npx serve`), the app loads **locations.md** automatically — you may never need the convert/build step or the “sharing” steps. A Cursor agent may have set up the project so those steps weren’t required when building it.

## Quick start

Open **Interactive_Map.html** in a browser. The map and all embedded locations load immediately. For **distance measurement** and **scale legend**, the app uses the Sanji–To'Acar baseline (24 miles) from the map.

---

## Project files

| File | Purpose |
|------|--------|
| **Interactive_Map.html** | Main map app. Contains the embedded `LOCATIONS` array, map UI (toolbar, detail panel, locations list), measure tool, scale legend, custom pins (localStorage), and help (?) button. |
| **locations.md** | Single source of truth for location data: names, categories, pixel positions, and descriptions. See “Editing locations” below. |
| **convert.html** | Converts **locations.md** to a `LOCATIONS` JSON array. Paste the result into **Interactive_Map.html** (search for `const LOCATIONS =`) when you want to ship a self-contained map without a server. |
| **build.js** | Node script that reads **locations.md** and injects the `LOCATIONS` array into an HTML file. By default it targets **index.html**; see “Build script” for using it with **Interactive_Map.html**. |
| **Map.png** | Map image used by the app (`<img src="Map.png">`). Must sit next to **Interactive_Map.html** (or the HTML file you open). |
| **INSTRUCTIONS.md** | Step-by-step guide: editing locations.md, testing, convert/build, and sharing. |
| **CHARACTERS.md** | How to add character names as links to HeroForge model pages (open in new tab). |

---

## Editing locations

**You only edit locations.md.** The format is:

- **Categories** — `## Category Name (optional emoji)` (e.g. `## Cities (⭘)`, `## Settlements (🛡)`, `## Points Of Interest (♡)`, `## Other Places of Note`). The app shows categories in a default order, then any others.
- **Location** — `### Location Name` then optional `Position: x, y` (pixel coordinates from the map image). All following lines until the next `###` or `##` are the description.
- **Single pin** — one `Position: x, y` per location.
- **Polyline (border/route)** — multiple `Position:` lines; points are connected in order (e.g. The Andel Line, The Nether border, Western Reaches).

Pixel coordinates are from **Map.png** (e.g. open in an image editor and read x,y). Use `0,0` as a placeholder until you set real positions.

**Workflow:**

- **Local dev with a server** — Run something like `npx serve` or VS Code Live Server in the project folder and open **Interactive_Map.html** from that URL. The app will `fetch("locations.md")` and use it. **No convert/build step needed** — editing **locations.md** is enough. (You may have built the project this way without ever running convert or build.)
- **Sharing with players (offline or any host)** — *Only if you need a single HTML file that works without a server:* Either:
  1. Open **convert.html**, paste the contents of **locations.md**, click Convert, then copy the generated `LOCATIONS` array and replace the array in **Interactive_Map.html** (search for `const LOCATIONS =`), or  
  2. Run the build script so the HTML file is updated automatically (see “Build script” below).

After that, share **Interactive_Map.html** and **Map.png** (same folder). Players open the HTML; custom pins they add are stored only in their browser (localStorage).

---

## What the map app does

- **Map** — Pan (drag), zoom (toolbar +/− or mouse wheel), Reset to fit window. Uses **Map.png** in the same directory.
- **Locations** — Right-hand list is grouped by category. Click a location or a pin on the map to open its details in the detail panel (× to close). Circle pins = single point; line pins = polylines (borders, routes).
- **Measure** — Toolbar “Measure” button: click two points on the map to see distance in miles (or feet for short distances). Scale is derived from Sanji–To'Acar ≈ 24 miles. A **Scale** legend in the bottom-left shows the current zoom scale.
- **Add Pins** — Toolbar “Add Pins”: click on the map to place a custom marker (optional label). Stored in the browser only; listed under “My pins”. Remove via the detail panel after selecting a pin.
- **Characters** — Expandable “Characters” section in the sidebar. Character names are links to HeroForge (or other) model pages; they open in a new tab. See **CHARACTERS.md** for adding entries.
- **Help** — “?” in the toolbar opens a short how-to in a new window.

---

## Sharing with players

*Only needed if you’re the one distributing.* Send **Interactive_Map.html** and **Map.png** in the same folder. Players open the HTML (double-click or from a file host). No server required. Optionally keep **locations.md** for your own editing and use convert/build when you want to refresh the embedded data.

---

## Changing the map image

Replace **Map.png** with your file (same name), or edit the HTML and change the image `src` (search for `Map.png`). If you use another filename, ensure it sits next to the HTML file.

---

## Build script (optional; only if you bake locations into the HTML)

**You may never need this** if you always run the map from a local server (the app loads **locations.md** then). Use **build.js** only when you want a single HTML file that works without a server (e.g. to send to players). **build.js** reads **locations.md**, parses it (same format as **convert.html**), and injects the `LOCATIONS` array into an HTML file. Default target is **index.html**.

```bash
node build.js
```

If your main app is **Interactive_Map.html** (and you have no **index.html**), either:

1. Temporarily rename **Interactive_Map.html** to **index.html**, run `node build.js`, then rename back, or  
2. Edit **build.js** and set `INDEX_HTML` to **Interactive_Map.html** (e.g. `const INDEX_HTML = path.join(ROOT, "Interactive_Map.html");`).

After a successful run, share the updated HTML and **Map.png** with players.

---

## Repository access

This repo is private. To give someone access:

1. On GitHub: repo → **Settings** → **Collaborators** (or **Manage access**).
2. **Add people** — enter their GitHub username or email, choose **Read**, **Write**, or **Admin**.
3. They accept the invite (email or GitHub notifications).

Link: `https://github.com/YOUR_USERNAME/Interactive_Daggerheart_Map/settings/access` (replace with your username and repo name).
