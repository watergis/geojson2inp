import InpBase from './InpBase';

export default class InpTitle extends InpBase {
  constructor(protected file: string, private projectTitle: string) {
    super(file, 'TITLE')
  }

  exportContents() {
    this.addText(`${this.projectTitle}\n`);
  }
}
