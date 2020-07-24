import roundTo from 'round-to';

export default class Coordinate {
  id: string;
  lon: number;
  lat: number;
  elevation: number;
  demand: number;
  pattern: string;
  isJunction: boolean;

  constructor(params: any) {
    this.id = params.id;
    this.lon = roundTo(params.lon, 6);
    this.lat = roundTo(params.lat, 6);
    this.elevation = roundTo(params.elevation, 0);
    this.demand = params.demand ? roundTo(params.demand, 6) : 0;
    this.pattern = params.patten ? params.patten : '';
    this.isJunction = true;
  }

  getKey() {
    return [this.lon, this.lat].join(',');
  }
}
