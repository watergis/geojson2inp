import roundTo from 'round-to';
import {distance, point} from '@turf/turf';

import LayerBase from './LayerBase';
import Coordinates from './Coordinates';
import { Pipe } from '../asset';
import { InpPipes } from '../inp';

export default class Pipes extends LayerBase {
  private pipes: Pipe[] = [];

  constructor(protected geojsonFile: string, private coords: Coordinates) {
    super('Pipes', geojsonFile);
  }

  load() {
    const getProperty = (props: any, name:string) =>{
      return props[name];
    }

    const geojson = this.loadGeoJSON();
    if (!geojson){return false;}
    geojson.features.forEach((f: GeoJSON.Feature) => {
      const pipe_id: string = getProperty(f.properties, 'id');
      const pipe_size: number = getProperty(f.properties, 'diameter');
      let coordinates: number[][];
      switch (f.geometry.type){
        case 'MultiPoint':
          coordinates = getProperty(f.geometry, 'coordinates');
          break;
        default:
          coordinates = getProperty(f.geometry, 'coordinates')[0];
      }
      coordinates.forEach(c1=>{
        const x1 : number= roundTo(c1[0], 6);
        const y1 : number= roundTo(c1[1], 6);
        const key1 : string= [x1, y1].join(',');
        const coord1 = this.coords.getByKey(key1);
        if (!coord1){return;}
        const currentIndex: number = coordinates.indexOf(c1);
        const nextIndex : number = currentIndex + 1;
        if (nextIndex >= coordinates.length){return;}
        const c2 : number[] = coordinates[nextIndex];
        const x2 : number = roundTo(c2[0], 6)
        const y2 : number = roundTo(c2[1], 6)
        const key2: string= [x2, y2].join(',');
        const coord2 = this.coords.getByKey(key2);
        if (!coord2){return;};
        if (key1 === key2) {return;};
        const length: number = distance(point(c1), point(c2), {units:'meters'});
        const pipe = new Pipe({
          id : `${pipe_id}-${currentIndex}`,
          node1: coord1.id,
          node2: coord2.id,
          length: length,
          diameter: pipe_size,
        });
        this.pipes.push(pipe);
      })
    });
  }

  updatePipeNode(id: string, lon:number, lat:number){
    const key = [lon,lat].join(',');
    const coord = this.coords.getByKey(key);
    if (!coord){return null;}
    const nodeid = coord.id
    this.pipes.forEach((p:Pipe)=>{
      if (nodeid === p.node1){
        p.setNode(id, p.node2);
        coord.id = id;
      }else if (nodeid === p.node2){
        p.setNode(p.node1, id);
        coord.id = id;
      }
    })
  }

  getIntersectPipes(nodeid:string){
    let intersect_pipes : Pipe[] = [];
    this.pipes.forEach((pipe:Pipe)=>{
      if (nodeid == pipe.node1 || nodeid == pipe.node2){
        intersect_pipes.push(pipe);
        return;
      }
    })
    return intersect_pipes;
  }

  getFormat(output: string, idsExcludes: string[]) {
    return new InpPipes(output, this.pipes, idsExcludes);
  }
}
