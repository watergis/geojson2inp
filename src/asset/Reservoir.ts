import roundTo from 'round-to';

export default class Reservoir {
  id: string;
  lon: number;
  lat: number;
  elevation: number;
  pattern: string;

  constructor(params: any) {
    this.id = params.id;
    this.lon = roundTo(params.lon, 6);
    this.lat = roundTo(params.lat, 6);
    this.elevation = roundTo(params.elevation, 0);
    this.pattern = params.patten ? params.patten : '';
  }
}
