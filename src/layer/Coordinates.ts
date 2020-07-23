import LayerBase from './LayerBase'
import {Coordinate} from '../asset';
import { InpJunctions, InpCoordinates } from '../inp';

export default class Coordinates extends LayerBase {
  private coordMap: { [key: string]: Coordinate } = {};

  constructor(geojsonFile: string) {
    super(geojsonFile);
  }

  load() {
    const junctions = this.loadGeoJSON();

    this.coordMap = {};
    junctions.features.forEach((f: GeoJSON.Feature) => {
      let coord: Coordinate = new Coordinate(f.properties);
      let key: string = coord.getKey();
      this.coordMap[key] = coord;
    });
  }

  add(coord: Coordinate) {
    const key = coord.getKey();
    coord.isJunction = false;
    this.coordMap[key] = coord;
  }

  getByKey(key:string){
    return this.coordMap[key];
  }

  getById(id: string) {
    Object.keys(this.coordMap).forEach((k: string) => {
      if (this.coordMap[k].id === id) {
        return this.coordMap[k];
      }
    });
    return null;
  }

  getFormatJunction(output: string) {
    return new InpJunctions(output, this.coordMap);
  }

  getFormatCoordinate(output: string) {
    return new InpCoordinates(output, this.coordMap);
  }
}
