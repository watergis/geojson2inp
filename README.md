# geojson2inp
![](https://github.com/watergis/geojson2inp/workflows/Node.js%20Package/badge.svg)
![GitHub](https://img.shields.io/github/license/watergis/geojson2inp)

This module converts GeoJSON to EPANET INP file

## Installation

```
npm install @watergis/geojson2inp
```

## Usage

```js
const {geojson2inp} = require('@watergis/geojson2inp');

const config = {
      title: 'test', //title for the project name which is appeared in INP
      geojson: {
        junctions: __dirname + '/data/junctions.geojson',  //required
        pipes: __dirname + '/data/pipes.geojson',  //required
        pumps: __dirname + '/data/pumps.geojson',  //optional
        reservoirs: __dirname + '/data/reservoirs.geojson',  //optional
        tanks: __dirname + '/data/tanks.geojson',  //optional
        valves: __dirname + '/data/valves.geojson'  //optional
      },
      output: __dirname + '/data.inp'  //output INP file path
    }
  
const js2inp = new geojson2inp(config.geojson, config.output, config.title);
const file = await js2inp.generate() //return exported inp file path
```

Both junctions and pipes are required. Others are optional, however you can't also analyze it in EPANET without reservoirs and tanks.

About interfaces of GeoJSON, please see the sample data and [tests/data](./test/data) direcotry.

You can produce your own GeoJSON by using [watergis/postgis2geojson](https://github.com/watergis/postgis2geojson) package.

## Build

```
npm run build
```

## Test

```
npm test
```