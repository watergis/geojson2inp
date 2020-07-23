import {geojson2inp} from '../src/index';
import fs from 'fs'

describe('test', (): void => {

  test('success case', (): void => {
    const config = {
      title: 'test',
      geojson: {
        junctions: __dirname + '/data/junctions.geojson',
        pipes: __dirname + '/data/pipes.geojson',
        pumps: __dirname + '/data/pumps.geojson',
        reservoirs: __dirname + '/data/reservoirs.geojson',
        tanks: __dirname + '/data/tanks.geojson',
        valves: __dirname + '/data/valves.geojson'
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);
    const file = js2inp.generate();
    
    expect(fs.existsSync(file)).toBeTruthy();
  });
})
