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

            let totalFuelCumulator = 0;
            let fuelperPart = 0;

            const totalFuel =  masses.reduce(function (totalFuelCumulator,  masse) {
                fuelperPart =  Math.floor(masse / 3) - 2;
                return totalFuelCumulator + fuelperPart;
              }, 0);

            console.log(`Fuel need ${totalFuel}`);
        }catch(e){
            console.log(e);
            throw e;
        }
    }
  }
  let app = new App({dataset: Dataset});
  app.run();