import LayerBase from './LayerBase';
import Coordinates from './Coordinates';
import {Coordinate, Tank} from '../asset';
import { InpTanks } from '../inp';
// import {InpReservoirs} from '../inp';

export default class Tanks extends LayerBase {
  private tanks: Tank[] = [];

  constructor(geojsonFile: string, private coords: Coordinates) {
    super('Tanks', geojsonFile);
  }

  load() {
    const geojson = this.loadGeoJSON();
    if (!geojson){return false;}
    geojson.features.forEach((f: GeoJSON.Feature) => {
      let t: Tank = new Tank(f.properties);
      this.tanks.push(t);
      this.coords.add(new Coordinate(f.properties));
    });
  }

  getFormat(output: string) {
    return new InpTanks(output, this.tanks);
  }
}
