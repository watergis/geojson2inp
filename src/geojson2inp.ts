import fs from 'fs';
import { Coordinates, Reservoirs, Tanks, Pipes, Pumps, Valves } from './layer';
import InpBase from './inp/InpBase';
import { InpTitle, InpEnd, InpOptions } from './inp';

class geojson2inp {
  private geojson: { [key: string]: string };
  private output: string;
  private title: string;

  constructor(geojson: { [key: string]: string }, output: string, title: string) {
    this.geojson = geojson;
    this.output = output;
    this.title = title;
  }

  generate() {
    return new Promise<string>((resolve: (value?: string) => void, reject: (reason?: any) => void) =>{
      if (!(this.geojson.junctions && this.geojson.pipes)){
        reject('One of GeoJSON for jucntions and pipes are missing');
      }
      const coords = new Coordinates(this.geojson.junctions);
      const reservoirs = new Reservoirs(this.geojson.reservoirs, coords);
      const tanks = new Tanks(this.geojson.tanks, coords);
      const pipes = new Pipes(this.geojson.pipes, coords);
      const pumps = new Pumps(this.geojson.pumps, coords, pipes);
      const valves = new Valves(this.geojson.valves, coords, pipes);
  
      const layers = [
        coords, 
        reservoirs,
        tanks,
        pipes,
        pumps,
        valves
      ];
      layers.forEach(t=>{t.load()})
  
      if (fs.existsSync(this.output)) {
        fs.unlinkSync(this.output);
      }
  
      let del_pipes_id: string[] = [];
      pumps.get_del_pipes_id().forEach((id:string)=>{del_pipes_id.push(id)});
      valves.get_del_pipes_id().forEach((id:string)=>{del_pipes_id.push(id)});
  
      [
        new InpTitle(this.output, this.title),
        coords.getFormatJunction(this.output),
        reservoirs.getFormat(this.output),
        tanks.getFormat(this.output),
        pipes.getFormat(this.output, del_pipes_id),
        pumps.getFormat(this.output),
        valves.getFormat(this.output),
        pumps.getFormatCurve(this.output),
        new InpOptions(this.output),
        coords.getFormatCoordinate(this.output),
        new InpEnd(this.output)
      ].forEach((t:InpBase)=>{t.export()})
  
      resolve(this.output);
    });
    
  }
}

export default geojson2inp;
