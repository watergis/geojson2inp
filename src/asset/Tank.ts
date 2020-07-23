import roundTo from 'round-to';

export default class Reservoir {
  id: string;
  elevation: number;
  capacity: number;
  max_level: number;
  init_level: number;
  min_level: number;
  lon: number;
  lat: number;
  diameter: number;
  min_vol: number;
  vol_curve: string;

  constructor(params: any) {
    this.id = params.id;
    this.elevation = params.elevation ? roundTo(params.elevation, 0) : 0;
    this.capacity = params.capacity ? roundTo(params.capacity, 0) :0;
    this.max_level = params.max_level ? roundTo(params.max_level, 2) :1.5;
    this.init_level = params.init_level ? roundTo(params.init_level, 2) :0.75;
    this.min_level = params.min_level ? roundTo(params.min_level, 2) :0.15;
    this.lon = roundTo(params.lon, 6);
    this.lat = roundTo(params.lat, 6);
    this.diameter = params.diameter ? roundTo(params.diameter, 0) :5;
    this.min_vol = this.capacity;
    this.vol_curve = params.vol_curve ? params.vol_curve: '';
  }
}