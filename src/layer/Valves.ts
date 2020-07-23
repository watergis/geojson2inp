import LayerBase from './LayerBase';
import { Coordinates, Pipes } from './index';
import { Valve, Pipe } from '../asset';
import { InpValves } from '../inp';

export default class Valves extends LayerBase {
  private valves: Valve[] = [];
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
      const valve = new Valve(f.properties);
      this.valves.push(valve);
      const key = [valve.lon, valve.lat].join(',');
      const coord = this.coords.getByKey(key);
      if (!coord){return;};
      // this.del_coords_id.push(coord.id);
      
      this.pipes.getPipes().forEach((pipe:Pipe)=>{
        if (coord.id == pipe.node1){
          valve.setNode(valve.node1, pipe.node2);
          // this.del_pipes_id.push(pipe.id);
        }else if (coord.id == pipe.node2){
          valve.setNode(pipe.node1, valve.node2);
        }
      })
    });
  }

  getFormat(output: string) {
    return new InpValves(output, this.valves);
  }
}
