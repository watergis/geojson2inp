import pad from 'pad';
import InpBase from './InpBase';
import { Tank } from '../asset';

export default class InpTanks extends InpBase {
  constructor(protected file: string, private tanks: Tank[]) {
    super(file, 'TANKS')
  }

  createHeader() {
    const headers = [
      pad('ID', 20),
      pad('Elevation', 12),
      pad('InitLevel', 12),
      pad('MinLevel', 12),
      pad('MaxLevel', 12),
      pad('Diameter', 12),
      pad('MinVol', 12),
      pad('VolCurve', 16)
    ];
    this.addText(`;${headers.join('\t')}\n`);
  }

  addContent(data: Tank) {
    const contents = [
      pad(data.id, 20),
      pad(data.elevation.toString(), 12),
      pad(data.init_level.toString(), 12),
      pad(data.min_level.toString(), 12),
      pad(data.max_level.toString(), 12),
      pad(data.diameter.toString(), 12),
      pad(data.min_vol.toString(), 12),
      pad(data.vol_curve, 16)
    ];
    this.addText(` ${contents.join('\t')}\t;\n`);
  }

  exportContents() {
    if (!this.tanks){return;}
    this.tanks.forEach((t: Tank) => {
      this.addContent(t);
    });
  }
}
