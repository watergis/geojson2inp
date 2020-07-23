import roundTo from 'round-to';

export default class Pump {
  id: string;
  lon: number;
  lat: number;
  curve: PumpCurve;
  parameter: string;
  elevation: number;
  node1: string = '';
  node2: string = '';

  constructor(params: any) {
    this.id = params.id;
    this.lon = roundTo(params.lon, 6);
    this.lat = roundTo(params.lat, 6);
    this.curve = new PumpCurve(params.id, params.discharge, params.head);
    this.parameter = `Head ${this.curve.id}`;
    this.elevation = params.elevation ? params.elevation : 0;
  }

  setNode(node1: string, node2: string){
    this.node1 = node1;
    this.node2 = node2;
  }
}

export class PumpCurve{
  id: string;
  flow: number;
  head: number;

  constructor(id:string, flow:number, head: number){
    this.id = `curve-${id}`;
    this.flow = flow;
    this.head = head;
  }
}