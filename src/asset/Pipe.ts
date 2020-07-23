import roundTo from 'round-to';

export default class Pipe {
  id: string;
  node1: string;
  node2: string;
  length: number;
  diameter: number;
  roughness: number;
  minorloss: number;
  status: string;

  constructor(params: any) {
    this.id = params.id;
    this.node1 = params.node1;
    this.node2 = params.node2;
    this.length = params.length ? roundTo(params.length, 3) :0;
    this.diameter = params.diameter ? roundTo(params.diameter, 0) :0;
    this.roughness = params.roughness ? roundTo(params.roughness, 0) :100;
    this.minorloss = params.minorloss ? roundTo(params.minorloss, 0) :0;
    this.status = params.status ? params.status : 'open';
  }

  setNode(node1: string, node2: string){
    this.node1 = node1;
    this.node2 = node2;
  }
}