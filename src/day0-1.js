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
            const masses = data.split("\n");
            console.log(masses);

            let totalFullCumulator = 0;
            let fullperPart = 0;

            const totalFull =  masses.reduce(function (totalFullCumulator,  masse) {
                fullperPart =  Math.floor(masse / 3) - 2;
                return totalFullCumulator + fullperPart;
              }, 0);

            console.log(`Full need ${totalFull}`);
        }catch(e){
            console.log(e);
            throw e;
        }
    }
  }
  let app = new App({dataset: Dataset});
  app.run();