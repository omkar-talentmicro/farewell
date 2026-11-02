# Farewell

A single-file farewell page. `index.html` (and its twin `dashboard.html`) is the built, fully offline page that GitHub Pages serves.

## Editing

All content lives in `src/template.html`, in the `SENDER` and `PEOPLE` blocks at the top of the script. Photos go in `photos/` (`me.jpg` for the sender, `firstname-lastname.jpg` for a person).

Rebuild after any change (needs Node and `tailwindcss` available via `npx`):

```sh
node build.mjs
```

## Background music

The page plays `music/sadness-and-sorrow.mp3` (looped, faded in) from the moment it opens. Browsers block sound until the
visitor interacts, so when that happens it starts on their first tap, click or key press instead. If the file is missing,
a synthesised piano plays instead. Swap the track by replacing the file (keep the name) — no rebuild needed.

## Personal links

`index.html?to=firstname-lastname` (or just `?to=firstname`) scrolls to the people section and opens that person's note.
