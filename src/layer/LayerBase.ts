import fs from 'fs';

export default class LayerBase {
  protected geojsonFile: string;

  constructor(geojsonFile: string) {
    this.geojsonFile = geojsonFile;
  }

  loadGeoJSON() {
    if (fs.existsSync(this.geojsonFile)){
      const geojson = JSON.parse(fs.readFileSync(this.geojsonFile, 'utf8'))
      if (!geojson){
        console.log(`Skipped. Can't load this GeoJSON file: ${this.geojsonFile}`)
        return;
      }
      if (!(geojson.features && geojson.features.length >0)){
        throw new Error(`No features in this GeoJSON file: ${this.geojsonFile}`);
      }
      return geojson;
    }
  }
}