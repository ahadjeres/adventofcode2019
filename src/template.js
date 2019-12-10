const fs = require('fs');
const fsPromises = fs.promises;

const Dataset = "../dataset/day0-1"

class App {
    constructor({dataset}) {
      this.dataset = dataset;

    }
    async run(){
        console.log(`APP started with ${this.dataset}`)
        
        try{
            const data = await fsPromises.readFile(this.dataset, 'utf8');
            console.log(data);
        }catch(e){
            console.log(e);
            throw e;
        }
    }
  }
  let app = new App({dataset: Dataset});
  app.run();