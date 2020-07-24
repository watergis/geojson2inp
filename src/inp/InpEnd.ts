import InpBase from './InpBase';

export default class InpEnd extends InpBase {
  constructor(protected file: string) {
    super(file, 'END')
  }

  exportContents() {
    this.addText(`\n`);
  }
}
