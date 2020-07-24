import fs from 'fs';

export default class InpBase{
  constructor(protected file: string, protected title?: string) {}

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