import fs from 'fs';

export default class LayerBase {
  protected geojsonFile: string;

  constructor(geojsonFile: string) {
    this.geojsonFile = geojsonFile;
  }

  loadGeoJSON() {
    return JSON.parse(fs.readFileSync(this.geojsonFile, 'utf8'));
  }
}