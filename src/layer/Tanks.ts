import LayerBase from './LayerBase';
import Coordinates from './Coordinates';
import {Coordinate, Tank} from '../asset';
import { InpTanks } from '../inp';
// import {InpReservoirs} from '../inp';

export default class Tanks extends LayerBase {
  private tanks: Tank[] = [];
  private coords: Coordinates;

  constructor(geojsonFile: string, coords: Coordinates) {
    super(geojsonFile);
    this.coords = coords;
  }

  load() {
    const geojson = this.loadGeoJSON();
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
