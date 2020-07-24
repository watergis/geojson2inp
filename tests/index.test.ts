import {geojson2inp} from '../src/index';
import fs from 'fs'

describe('success case', (): void => {

  test('includes all assets', async() => {
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
    const file = await js2inp.generate()
    expect(fs.existsSync(file)).toBeTruthy();
    fs.unlinkSync(file);
  });

  test('includes only junctions and pipes', async() => {
    const config = {
      title: 'test',
      geojson: {
        junctions: __dirname + '/data/junctions.geojson',
        pipes: __dirname + '/data/pipes.geojson',
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);
    const file = await js2inp.generate()
    expect(fs.existsSync(file)).toBeTruthy();
    fs.unlinkSync(file);
  });
})

describe('failed case', (): void => {
  test('missing pipes', () => {
    const config = {
      title: 'test',
      geojson: {
        junctions: __dirname + '/data/junctions.geojson',
        pumps: __dirname + '/data/pumps.geojson',
        reservoirs: __dirname + '/data/reservoirs.geojson',
        tanks: __dirname + '/data/tanks.geojson',
        valves: __dirname + '/data/valves.geojson'
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);   
    expect.assertions(1);
    return js2inp.generate().catch(e => {
      expect(e).toBe('One of GeoJSON for jucntions and pipes are missing');
      if (fs.existsSync(config.output)){
        fs.unlinkSync(config.output);
      }
    });
  })

  test('missing junctions', () => {
    const config = {
      title: 'test',
      geojson: {
        pipes: __dirname + '/data/pipes.geojson',
        pumps: __dirname + '/data/pumps.geojson',
        reservoirs: __dirname + '/data/reservoirs.geojson',
        tanks: __dirname + '/data/tanks.geojson',
        valves: __dirname + '/data/valves.geojson'
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);  
    expect.assertions(1); 
    return js2inp.generate().catch(e => {
      expect(e).toBe('One of GeoJSON for jucntions and pipes are missing');
      if (fs.existsSync(config.output)){
        fs.unlinkSync(config.output);
      }
    });
  })

  test('missing both junctions and pipes', () => {
    const config = {
      title: 'test',
      geojson: {
        pumps: __dirname + '/data/pumps.geojson',
        reservoirs: __dirname + '/data/reservoirs.geojson',
        tanks: __dirname + '/data/tanks.geojson',
        valves: __dirname + '/data/valves.geojson'
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);   
    expect.assertions(1);
    return js2inp.generate().catch(e => {
      expect(e).toBe('One of GeoJSON for jucntions and pipes are missing');
      if (fs.existsSync(config.output)){
        fs.unlinkSync(config.output);
      }
    });
  })

  test('geojson is NULL', async() => {
    const config = {
      title: 'test',
      geojson: {
        junctions: __dirname + '/nulldata/junctions.geojson',
        pipes: __dirname + '/nulldata/pipes.geojson',
        pumps: __dirname + '/nulldata/pumps.geojson',
        reservoirs: __dirname + '/nulldata/reservoirs.geojson',
        tanks: __dirname + '/nulldata/tanks.geojson',
        valves: __dirname + '/nulldata/valves.geojson'
      },
      output: __dirname + '/data.inp'
    }
  
    const js2inp = new geojson2inp(config.geojson, config.output, config.title);   
    expect.assertions(1);
    return js2inp.generate().catch(e => {
      expect(e).toBe('GeoJSON has no any features in Coordinates or Pipes layers.');
      if (fs.existsSync(config.output)){
        fs.unlinkSync(config.output);
      }
    });
  })
})