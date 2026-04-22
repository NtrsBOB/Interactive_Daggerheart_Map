# Interactive Daggerheart Map

**Purpose:** this repository holds an **offline-first** interactive map for the **Daggerheart** TTRPG setting — the **Kingdom of Sylvakar**. The map (HTML + **Map.png**) is suitable for use at the table, sent as a folder to players, or **hosted on GitHub Pages** so you can paste a **public HTTPS link** in a Discord channel (or anywhere else) — Discord cannot run the map inside a message, but the link works like any other website.

One HTML file plus a map image; no install, no app dependencies. Open in any browser. Players can pan, zoom, browse locations (cities, settlements, points of interest), measure distances (scale: Sanji–To'Acar ≈ 24 miles), and add their own pins (stored in the browser only).

**Live site (after GitHub Pages is enabled on `/docs`):** `https://<your-github-username>.github.io/Interactive_Daggerheart_Map/` — replace `<your-github-username>` and the path segment with your real username and repository name. The `docs/index.html` entry redirects to the map.

---

**Step-by-step guide** — see **[INSTRUCTIONS.md](INSTRUCTIONS.md)** (editing `locations.md`, testing, convert/build, sharing). **Note:** if you only edit **locations.md** and open the map via a local server (e.g. Live Server, `npx serve`) with paths set up to load it, the app can load **locations.md** automatically — you may never need the convert/build step. Use convert/build when you need a self-contained `docs/Interactive_Map.html` for static hosting.

## Quick start

Open **`docs/Interactive_Map.html`** in a browser (or the **Live site** URL at the top of this file after you enable GitHub Pages). The map and all embedded locations load immediately. For **distance measurement** and **scale legend**, the app uses the Sanji–To'Acar baseline (24 miles) from the map.

---

## Project files

| File | Purpose |
|------|--------|
| **docs/Interactive_Map.html** | Map app published to GitHub Pages. Contains the embedded `LOCATIONS` array, map UI (toolbar, detail panel, locations list), measure tool, scale legend, custom pins (localStorage), and help (?) button. |
| **docs/Map.png** | Map image used by the app (`<img src="Map.png">` relative to the HTML in `docs/`). |
| **docs/index.html** | Optional entry so `https://…github.io/…/REPO/` opens the map. |
| **docs/.nojekyll** | Empty file so GitHub Pages does not run Jekyll on the static site. |
| **locations.md** | Single source of truth for location data: names, categories, pixel positions, and descriptions. See “Editing locations” below. |
| **convert.html** | Converts **locations.md** to a `LOCATIONS` JSON array. Paste the result into **docs/Interactive_Map.html** (search for `const LOCATIONS =`) when you want to ship a self-contained map without a server. |
| **build.js** | Node script that reads **locations.md** and injects the `LOCATIONS` array into **docs/Interactive_Map.html** (see “Build script”). |
| **[INSTRUCTIONS.md](INSTRUCTIONS.md)** | Step-by-step guide: editing locations.md, testing, convert/build, and sharing. |
| **CHARACTERS.md** | How to add character names as links to HeroForge model pages (open in new tab). |

---

## Editing locations

**You only edit locations.md.** The format is:

- **Categories** — `## Category Name (optional emoji)` (e.g. `## Cities (⭘)`, `## Settlements (🛡)`, `## Points Of Interest (♡)`, `## Other Places of Note`). The app shows categories in a default order, then any others.
- **Location** — `### Location Name` then optional `Position: x, y` (pixel coordinates from the map image). All following lines until the next `###` or `##` are the description.
- **Single pin** — one `Position: x, y` per location.
- **Polyline (border/route)** — multiple `Position:` lines; points are connected in order (e.g. The Andel Line, The Nether border, Western Reaches).

Pixel coordinates are from **`docs/Map.png`** (e.g. open in an image editor and read x,y). Use `0,0` as a placeholder until you set real positions.

**Workflow:**

- **Local dev with a server** — From the **project root**, run e.g. `npx serve` or VS Code Live Server and open **`/docs/Interactive_Map.html`**. The app loads **`../locations.md`** (the file in the repo root), so you can keep editing **locations.md** without running convert or build. See **[INSTRUCTIONS.md](INSTRUCTIONS.md)** if you need a self-contained `docs/Interactive_Map.html` without that fetch.
- **Sharing with players (offline or any host)** — *Only if you need a single HTML file that works without a server or without **locations.md** on the host:* either:
  1. Open **convert.html**, paste the contents of **locations.md**, click Convert, then copy the generated `LOCATIONS` array and replace the array in **docs/Interactive_Map.html** (search for `const LOCATIONS =`), or  
  2. Run `node build.js` from the project root (see “Build script” below).

After that, share **docs/Interactive_Map.html** and **docs/Map.png** (same folder). For GitHub Pages, commit the updated `docs/` files. Players open the HTML; custom pins they add are stored only in their browser (localStorage).

---

## What the map app does

- **Map** — Pan (drag), zoom (toolbar +/− or mouse wheel), Reset to fit window. Uses **Map.png** next to the HTML in **`docs/`**.
- **Locations** — Right-hand list is grouped by category. Click a location or a pin on the map to open its details in the detail panel (× to close). Circle pins = single point; line pins = polylines (borders, routes).
- **Measure** — Toolbar “Measure” button: click two points on the map to see distance in miles (or feet for short distances). Scale is derived from Sanji–To'Acar ≈ 24 miles. A **Scale** legend in the bottom-left shows the current zoom scale.
- **Add Pins** — Toolbar “Add Pins”: click on the map to place a custom marker (optional label). Stored in the browser only; listed under “My pins”. Remove via the detail panel after selecting a pin.
- **Characters** — Expandable “Characters” section in the sidebar. Character names are links to HeroForge (or other) model pages; they open in a new tab. See **CHARACTERS.md** for adding entries.
- **Help** — “?” in the toolbar opens a short how-to in a new window.

---

## Sharing with players

*Only needed if you’re the one distributing.* Send **docs/Interactive_Map.html** and **docs/Map.png** in the same folder (or share the **Live site** URL from the top of this README). No server is required for a baked-in `LOCATIONS` list. Keep **locations.md** at the repo root for your own editing, and use convert/build when you want to refresh the embedded data in **docs/Interactive_Map.html** before a release or a push to GitHub Pages.

---

## Changing the map image

Replace **`docs/Map.png`** (same name) or edit **`docs/Interactive_Map.html`** and change the image `src` (search for `Map.png`). If you use another filename, keep the image next to that HTML file under **`docs/`**.

---

## Build script (optional; only if you bake locations into the HTML)

**You may not need this** for day-to-day editing if you always open the map from a static server with **locations.md** at the repo root (see “Local dev with a server” above). Use **build.js** when you want **docs/Interactive_Map.html** to contain the latest `LOCATIONS` from **locations.md** (e.g. before committing for GitHub Pages, or to ship a folder without **locations.md**).

From the **project root**:

```bash
node build.js
```

**build.js** reads **locations.md**, parses it (same format as **convert.html**), and injects the `LOCATIONS` array into **`docs/Interactive_Map.html`**. The script path is the `INDEX_HTML` constant in **build.js**; change it only if you relocate that file.

On success, the script prints how many locations were written. Commit the updated **`docs/Interactive_Map.html`** (and any image changes) if you are deploying. See **[INSTRUCTIONS.md](INSTRUCTIONS.md)** for the no-Node path via **convert.html**.

---

## Repository access

This repo is private. To give someone access:

1. On GitHub: repo → **Settings** → **Collaborators** (or **Manage access**).
2. **Add people** — enter their GitHub username or email, choose **Read**, **Write**, or **Admin**.
3. They accept the invite (email or GitHub notifications).

Link: `https://github.com/YOUR_USERNAME/Interactive_Daggerheart_Map/settings/access` (replace with your username and repo name).
