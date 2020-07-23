import pad from 'pad';
import InpBase from './InpBase';
import { Pipe } from '../asset';

export default class InpPipes extends InpBase {
  private pipes: Pipe[];
  private idsExcludes: string[];
  constructor(file: string, pipes: Pipe[], idsExcludes: string[]) {
    super(file, 'PIPES')
    this.pipes = pipes;
    this.idsExcludes = idsExcludes;
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Node1', 20),
      pad('Node2', 20),
      pad('Length', 12),
      pad('Diameter', 12),
      pad('Roughness', 12),
      pad('MinorLoss', 12),
      pad('Status', 12)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Pipe) {
    const contents = [
      pad(data.id, 20),
      pad(data.node1.toString(), 20),
      pad(data.node2.toString(), 20),
      pad(data.length.toString(), 12),
      pad(data.diameter.toString(), 12),
      pad(data.roughness.toString(), 12),
      pad(data.minorloss.toString(), 12),
      pad(data.status, 12)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    this.pipes.forEach((t: Pipe) => {
      if (this.idsExcludes && this.idsExcludes.includes(t.id)){
        return;
      }
      this.addContent(t);
    });
  }
}
