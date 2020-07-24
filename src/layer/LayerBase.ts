import fs from 'fs';

export default class LayerBase {
  constructor(public name: string, protected geojsonFile: string) {}

  loadGeoJSON() {
    if (fs.existsSync(this.geojsonFile)){
      const geojson = JSON.parse(fs.readFileSync(this.geojsonFile, 'utf8'))
      if (!geojson){
        console.log(`Skipped. Can't load this GeoJSON file: ${this.geojsonFile}`)
        return;
      }
      if (!(geojson.features && geojson.features.length >0)){
        console.log(`No features in this GeoJSON file: ${this.geojsonFile}`);
        return;
      }
      return geojson;
    }
  }
}