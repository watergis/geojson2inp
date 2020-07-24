import LayerBase from './LayerBase';
import { Coordinates, Pipes } from './index';
import { Pump, Pipe } from '../asset';
import { InpPumps, InpCurves } from '../inp';

export default class Pumps extends LayerBase {
  private pumps: Pump[] = [];

  private del_pipes_id: string[] = [];
  get_del_pipes_id(){
    return this.del_pipes_id;
  }

  private del_coords_id: string[] = [];
  get_del_coords_id(){
    return this.del_coords_id;
  }

  constructor(protected geojsonFile: string, private coords: Coordinates, private pipes: Pipes) {
    super('Pumps', geojsonFile);
  }

  load() {
    const geojson = this.loadGeoJSON();
    if (!geojson){return false;}
    geojson.features.forEach((f: GeoJSON.Feature) => {
      const pump = new Pump(f.properties);
      this.pumps.push(pump);
      const key = [pump.lon, pump.lat].join(',');
      const coord = this.coords.getByKey(key);
      if (!coord){return;};
      this.del_coords_id.push(coord.id);
      
      let intersect_pipes : Pipe[] = this.pipes.getIntersectPipes(coord.id);
      if (intersect_pipes.length > 0){
        pump.setNode(intersect_pipes[0].node1, intersect_pipes[0].node2);
        this.del_pipes_id.push(intersect_pipes[0].id);
      }
    });
  }

  getFormat(output: string) {
    return new InpPumps(output, this.pumps);
  }

  getFormatCurve(output: string){
    return new InpCurves(output, this.pumps);
  }
}
