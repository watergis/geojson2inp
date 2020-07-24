import pad from 'pad';
import InpBase from './InpBase';
import { Valve } from '../asset';

export default class InpValves extends InpBase {
  constructor(protected file: string, private valves: Valve[]) {
    super(file, 'VALVES')
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Node1', 20),
      pad('Node2', 20),
      pad('Diameter', 12),
      pad('Type', 12),
      pad('Setting', 12),
      pad('MinorLoss', 12)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Valve) {
    const contents = [
      pad(data.id, 20),
      pad(data.node1.toString(), 20),
      pad(data.node2.toString(), 20),
      pad(data.diameter.toString(), 12),
      pad(data.valve_type.toString(), 12),
      pad(data.setting.toString(), 12),
      pad(data.minor_loss.toString(), 12)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    if (!this.valves){return;}
    this.valves.forEach((t: Valve) => {
      this.addContent(t);
    });
  }
}
