import pad from 'pad';
import InpBase from './InpBase';
import { PumpCurve, Pump } from '../asset';

export default class InpPumps extends InpBase {
  constructor(file: string, private pumps: Pump[]) {
    super(file, 'CURVES')
  }

  createHeader() {
    const headers = [
      pad('ID', 16),
      pad('X-Value', 12),
      pad('Y-Value', 12)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: PumpCurve) {
    if (!data)return;
    const contents = [
      pad(data.id, 16),
      pad(data.flow?data.flow.toString():'', 12),
      pad(data.head?data.head.toString():'', 12)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    if (!this.pumps){return;}
    this.pumps.forEach((t: Pump) => {
      this.addContent(t.curve);
    });
  }
}
