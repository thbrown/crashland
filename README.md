## Spaceship Resurrection

JS13k game about a ship that crashes and needs to be rebuilt to save the crew

Player here: https://dev.js13kgames.com/games/spaceship-resurrection

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
