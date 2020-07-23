import LayerBase from './LayerBase';
import Coordinates from './Coordinates';
import {Coordinate, Reservoir} from '../asset';
import {InpReservoirs} from '../inp';

export default class Reservoirs extends LayerBase {
  private reservoirs: Reservoir[] = [];
  private coords: Coordinates;

  constructor(geojsonFile: string, coords: Coordinates) {
    super(geojsonFile);
    this.coords = coords;
  }

  load() {
    const geojson = this.loadGeoJSON();
    geojson.features.forEach((f: GeoJSON.Feature) => {
      let r: Reservoir = new Reservoir(f.properties);
      this.reservoirs.push(r);
      this.coords.add(new Coordinate(f.properties));
    });
  }

  getFormat(output: string) {
    return new InpReservoirs(output, this.reservoirs);
  }
}
