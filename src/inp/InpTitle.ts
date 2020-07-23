import InpBase from './InpBase';

export default class InpTitle extends InpBase {
  private projectTitle: string;
  constructor(file: string, projectTitle: string) {
    super(file, 'TITLE')
    this.projectTitle = projectTitle;
  }

  exportContents() {
    this.addText(`${this.projectTitle}\n`);
  }
}
