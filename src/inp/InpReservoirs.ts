import pad from 'pad';
import InpBase from './InpBase';
import { Reservoir } from '../asset';

export default class InpReservoirs extends InpBase {
  private reservoirs: Reservoir[];
  constructor(file: string, reservoirs: Reservoir[]) {
    super(file, 'RESERVOIRS')
    this.reservoirs = reservoirs;
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Head', 12),
      pad('Pattern', 16)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: any) {
    const contents = [
      pad(data.id, 20),
      pad(data.elevation.toString(), 12),
      pad(data.pattern, 16)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    this.reservoirs.forEach((r: Reservoir) => {
      this.addContent(r);
    });
  }
}
