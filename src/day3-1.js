const fs = require('fs');
const fsPromises = fs.promises;

const Dataset = "../dataset/day3"

class App {
    constructor({dataset}) {
        this.dataset = dataset;
  
      }
  
      async loadDataFromFile(){
          try{
              const data = await fsPromises.readFile(this.dataset, 'utf8');
              return data;
          }catch(e){
              console.log(e);
              throw e;
          }
      }
    async run(){
        console.log(`APP started with ${this.dataset}`)
        let rawData = await this.loadDataFromFile();
    }
  }
  
  let app = new App({dataset: Dataset});
  app.run();