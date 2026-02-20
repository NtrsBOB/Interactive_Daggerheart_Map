# Characters section

The map has an expandable **Characters** section in the sidebar. Under it you list character names that are **links to HeroForge** (or other) model pages. Clicking a name opens the link in a **new tab**.

---

## Adding characters

1. In **Interactive_Map.html**, search for `const CHARACTERS =`.
2. Add entries with **name** (label in the sidebar) and **url** (full link to the HeroForge character page):

   ```javascript
   const CHARACTERS = [
     { name: "My Hero", url: "https://www.heroforge.com/load_config%3D..." },
     { name: "Captain NPC", url: "https://www.heroforge.com/load_config%3D..." }
   ];
   ```

3. To get the HeroForge link: design your character on HeroForge, then copy the URL from your browser’s address bar (or use “Share” if HeroForge provides it). Paste that URL as the `url` value.

Entries without a `url` (or with an empty string) still show the name in the list but won’t be clickable.
