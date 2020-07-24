import fs from 'fs';

export default class InpBase{
  protected file: string = '';
  protected title: string | undefined;

  constructor(file: string, title?: string) {
    this.file = file;
    this.title = title;
  }

  addText(text: string) {
    fs.appendFileSync(this.file, text);
  }

  addTitle(){
    if (!this.title){return;}
    this.addText(`[${this.title}]\n`);
  }

  createHeader(){}

  addContent(data: any) {}

  export() {
    this.addTitle();
    this.createHeader();
    this.exportContents();
    this.addText(`\n`);
  }

  exportContents(idsExcludes?: string[]){}
}