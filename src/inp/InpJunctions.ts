import pad from 'pad';
import InpBase from './InpBase';
import { Coordinate } from '../asset';

export default class InpJunctions extends InpBase {
  private coordMap: { [key: string]: Coordinate };
  constructor(file: string, coordMap: { [key: string]: Coordinate }) {
    super(file, 'JUNCTIONS')
    this.coordMap = coordMap;
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Elev', 12),
      pad('Demand',12),
      pad('Pattern', 16)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Coordinate) {
    const contents = [
      pad(data.id, 20),
      pad(data.elevation.toString(), 12),
      pad(data.demand.toString(),12),
      pad(data.pattern, 16)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`)
  }

  exportContents() {
    Object.keys(this.coordMap).forEach((k: string) => {
      let coord = this.coordMap[k];
      if (!coord.isJunction){
        return;
      }
      this.addContent(coord);
    });
  }
}
