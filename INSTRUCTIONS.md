# Instructions: Working with locations.md and subsequent steps

This guide walks you through editing **locations.md**, testing your changes, updating the map app so it’s ready to share, and distributing it to players.

---

## 1. Edit locations.md

**locations.md** is the only file you edit for location data. The map app (and the convert/build tools) read this format.

### File structure

- **Categories** — A section header starts a category: `## Category Name` or `## Category Name (⭘)`. Examples: `## Cities (⭘)`, `## Settlements (🛡)`, `## Points Of Interest (♡)`, `## Other Places of Note`. The app shows categories in a fixed order (Cities, Settlements, Points Of Interest, Other Places of Note), then any others you add.
- **Locations** — Each location starts with `### Location Name`. Everything after that until the next `###` or `##` is part of that location (positions and description).
- **Separators** — You can use `---` between sections if you like; it’s ignored by the parser.

### Adding or changing a single-pin location

Use **one** `Position: x, y` line. The rest of the block is the description.

```markdown
### Sanji
Position: 864, 542

Smaller, quiet, peaceful farming town. Known for its premium quality of herbs and spice ingredients...
```

- **Position** — Pixel coordinates from the map image. Open **Map.png** in an image editor (or a viewer that shows coordinates) and read the x,y of the point you want. Use `0, 0` as a placeholder until you set real coordinates.
- **Description** — Any lines after the position (and after a blank line if you prefer) are the location’s description. No special syntax.

### Adding a polyline (border or route)

Use **multiple** `Position:` lines. Points are connected in order (point 1 → 2 → 3 …).

```markdown
### The Andel Line (··· border)
Position: 1166, 770
Position: 1236, 743
Position: 1384, 629
Position: 1475, 652

The Andel Line is located to the south east of the island...
```

### Tips

- Keep the **Map Legend — Locations** block at the top if you like (it’s skipped by the parser when it looks for category names).
- Category names are taken from the `##` line; anything in parentheses (e.g. emoji) is stripped for the internal category name.
- To add a new category, add a new `## Your Category` section; it will appear in the sidebar after the default ones.

Save **locations.md** when you’re done editing.

---

## 2. Test your changes (optional but recommended)

Before you update the map app or share it, you can test that **locations.md** is correct by loading the map from a **local server** so it can fetch **locations.md**:

1. In the project folder, start a local server, for example:
   - `npx serve`
   - Or use VS Code “Live Server” and open the project folder.
2. Open **Interactive_Map.html** via that server (e.g. `http://localhost:3000/Interactive_Map.html`).
3. The app will request **locations.md** and use it to replace the embedded locations. Check that all categories, pins, and polylines look right.

No convert or build step is needed for this. When you’re satisfied, continue to step 3.

---

## 3. Update the map app with your locations

The map app (**Interactive_Map.html**) has a **LOCATIONS** array embedded inside it. To ship a single HTML file (or use it without a server), you must put the contents of **locations.md** into that array. You can do that in one of two ways.

### Option A: Using convert.html (no Node.js)

1. Open **convert.html** in a browser.
2. Open **locations.md** in a text editor and copy its **entire** contents.
3. Paste into the text area in **convert.html**.
4. Click **Convert**.
5. Copy the generated output (it starts with `const LOCATIONS = ...`).
6. Open **Interactive_Map.html** in a text editor.
7. Search for `const LOCATIONS =` (or `let LOCATIONS =`). You’ll see a large array.
8. **Replace** the whole array (from `const LOCATIONS = [` or `let LOCATIONS = [` through the matching `];`) with the copied block. Do not remove the `;` or the code that follows (e.g. `function parseLocationsMd`).
9. Save **Interactive_Map.html**.

### Option B: Using build.js (Node.js)

1. Ensure **build.js** targets the correct HTML file:
   - If you use **Interactive_Map.html** as the main app, open **build.js** and set the HTML path. For example, change:
     - `const INDEX_HTML = path.join(ROOT, "index.html");`
     - to: `const INDEX_HTML = path.join(ROOT, "Interactive_Map.html");`
2. In a terminal, from the **project root** folder, run:
   ```bash
   node build.js
   ```
3. The script reads **locations.md**, parses it, and injects the **LOCATIONS** array into the HTML file. When it succeeds, it prints how many locations were injected.
4. Save any editor buffer for **Interactive_Map.html** if your editor had it open (the script writes to disk; reload the file if needed).

You only need **one** of Option A or Option B. After this step, **Interactive_Map.html** is up to date with **locations.md**.

---

## 4. Share with players

1. Put **Interactive_Map.html** and **Map.png** in the **same folder** (the app loads the image from `Map.png` next to the HTML file).
2. Share that folder (or the two files) with players — e.g. zip, cloud link, or web host.
3. Players open **Interactive_Map.html** in a browser (double-click or via the host). No server or install required. Custom pins they add are stored only in their browser.

You do **not** need to send **locations.md** or **convert.html** to players unless you want them to have the raw data or tools.

---

## Quick reference

| Goal | What to do |
|------|------------|
| Add/edit a location | Edit **locations.md** (single `Position:` for a pin, multiple for a polyline). Save. |
| Test without rebuilding | Run a local server, open **Interactive_Map.html** from it; app loads **locations.md**. |
| Bake locations into the map | Use **convert.html** (paste → Convert → copy into **Interactive_Map.html**) or **build.js** (`node build.js`). |
| Send to players | Share **Interactive_Map.html** + **Map.png** in the same folder. |

For more on the project and files, see **README.md**.
