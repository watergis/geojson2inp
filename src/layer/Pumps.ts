import LayerBase from './LayerBase';
import { Coordinates, Pipes } from './index';
import { Pump, Pipe } from '../asset';
import { InpPumps, InpCurves } from '../inp';

export default class Pumps extends LayerBase {
  private pumps: Pump[] = [];
  private pipes: Pipes;
  private coords: Coordinates;

  private del_pipes_id: string[] = [];
  get_del_pipes_id(){
    return this.del_pipes_id;
  }

  private del_coords_id: string[] = [];
  get_del_coords_id(){
    return this.del_coords_id;
  }

  constructor(geojsonFile: string, coords: Coordinates, pipes: Pipes) {
    super(geojsonFile);
    this.coords = coords;
    this.pipes = pipes;
  }

  load() {
    const geojson = this.loadGeoJSON();
    geojson.features.forEach((f: GeoJSON.Feature) => {
      const pump = new Pump(f.properties);
      this.pumps.push(pump);
      const key = [pump.lon, pump.lat].join(',');
      const coord = this.coords.getByKey(key);
      if (!coord){return;};
      // this.del_coords_id.push(coord.id);
      
      this.pipes.getPipes().forEach((pipe:Pipe)=>{
        if (coord.id == pipe.node1){
          pump.setNode(pump.node1, pipe.node2);
          // this.del_pipes_id.push(pipe.id);
        }else if (coord.id == pipe.node2){
          pump.setNode(pipe.node1, pump.node2);
        }
      })
    });
  }

  getFormat(output: string) {
    return new InpPumps(output, this.pumps);
  }

  getFormatCurve(output: string){
    return new InpCurves(output, this.pumps);
  }
}
