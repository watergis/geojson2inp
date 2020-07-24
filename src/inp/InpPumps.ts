import pad from 'pad';
import InpBase from './InpBase';
import { Pump } from '../asset';

export default class InpPumps extends InpBase {
  private pumps: Pump[];
  constructor(file: string, pumps: Pump[]) {
    super(file, 'PUMPS')
    this.pumps = pumps;
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Node1', 20),
      pad('Node2', 20),
      pad('Parameters', 12)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Pump) {
    const contents = [
      pad(data.id, 20),
      pad(data.node1.toString(), 20),
      pad(data.node2.toString(), 20),
      pad(data.parameter.toString(), 12)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    if (!this.pumps){return;}
    this.pumps.forEach((t: Pump) => {
      this.addContent(t);
    });
  }
}
