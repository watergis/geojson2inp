import fs from 'fs';
import { Coordinates, Reservoirs, Tanks, Pipes, Pumps } from './layer';
import InpBase from './inp/InpBase';

class geojson2inp {
  private geojson: { [key: string]: string };
  private output: string;

  constructor(geojson: { [key: string]: string }, output: string) {
    this.geojson = geojson;
    this.output = output;
  }

  generate() {
    const coords = new Coordinates(this.geojson.junctions);
    const reservoirs = new Reservoirs(this.geojson.reservoirs, coords);
    const tanks = new Tanks(this.geojson.tanks, coords);
    const pipes = new Pipes(this.geojson.pipes, coords);
    const pumps = new Pumps(this.geojson.pumps, coords, pipes);

    const layers = [
      coords, 
      reservoirs,
      tanks,
      pipes,
      pumps
    ];

    layers.forEach(t=>{t.load()})

    if (fs.existsSync(this.output)) {
      fs.unlinkSync(this.output);
    }

    let del_pipes_id: string[] = [];
    pumps.get_del_pipes_id().forEach((id:string)=>{del_pipes_id.push(id)});

    [
      coords.getFormatJunction(this.output),
      reservoirs.getFormat(this.output),
      tanks.getFormat(this.output),
      pipes.getFormat(this.output, del_pipes_id),
      pumps.getFormat(this.output),
      pumps.getFormatCurve(this.output),
      coords.getFormatCoordinate(this.output)
    ].forEach((t:InpBase)=>{t.export()})

    return this.output;
  }
}

export default geojson2inp;
