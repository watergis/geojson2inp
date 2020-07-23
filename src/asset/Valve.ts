import roundTo from 'round-to';

export default class Valve {
  id: string;
  lon: number;
  lat: number;
  diameter: number;
  valve_type: string;
  setting: number;
  minor_loss: number;
  node1: string = '';
  node2: string = '';
  elevation: number;

  constructor(params: any) {
    this.id = `${params.valve_type}-${params.id}`;
    this.lon = roundTo(params.lon, 6);
    this.lat = roundTo(params.lat, 6);
    this.diameter = params.diameter ? params.diameter : 0;
    this.valve_type = params.valve_type;
    this.setting = params.setting ? params.setting:0;
    this.minor_loss = params.minor_loss ? params.minor_loss : 0;
    this.elevation = params.elevation ? params.elevation : 0;
  }

  setNode(node1: string, node2: string){
    this.node1 = node1;
    this.node2 = node2;
  }
}