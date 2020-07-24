import pad from 'pad';
import InpBase from './InpBase';
import { Coordinate } from '../asset';

export default class InpCoordinates extends InpBase {
  constructor(file: string, private coordMap: { [key: string]: Coordinate }) {
    super(file, 'COORDINATES')
  }

  createHeader() {
    const headers = [
      pad('Node', 20),
      pad('X-Coord', 16),
      pad('Y-Coord',16),
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Coordinate) {
    const contents = [
      pad(data.id, 20),
      pad(data.lon.toString(), 16),
      pad(data.lat.toString(),16),
    ];
    this.addText(` ${contents.join('\t')}\t;\n`)
  }

  exportContents() {
    Object.keys(this.coordMap).forEach((k: string) => {
      let coord = this.coordMap[k];
      this.addContent(coord);
    });
  }
}
