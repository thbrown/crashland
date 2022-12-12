## Spaceship Resurrection

JS13k game about a ship that crashes and needs to be rebuilt to save the crew.

Play the original here: https://dev.js13kgames.com/games/spaceship-resurrection (placed 49th out of 151 entries)

In the updated version (post competition) I added some help text, fixed some button alignment issues, and, most importantly, re-designed most of the levels. The original game was much too difficult after level 1. I would have liked to have made these changes before the competition but I ran out of time!

Play the updated version here: https://thbrown.github.io/spaceship-resurrection/

## Prerequisites

1. install node
2. install npm

## To run

`npm install`
`npm run build-dev`

Then open `./dist/index.html` in your browser

## Other Scripts

```
  "build-prod": "webpack --mode=production --min",
  "build-dev": "webpack --mode=development",
  "build-watch": "webpack --mode=development --watch"
```

## Notes

Remove decimals from SVGs (OSX)

```
sed -i .bak -E 's/([[:digit:]])\.[[:digit:]]+/\1/g' Iron.svg
```

modified from https://stackoverflow.com/questions/47721459/trim-decimal-places-from-numbers-in-a-text-editor
