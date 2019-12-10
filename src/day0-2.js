const fs = require('fs');
const fsPromises = fs.promises;

const Dataset = "../dataset/day0-1"

class App {

    constructor({dataset}) {
      this.dataset = dataset;
    }

    fullMassCalculation ({mass}){

      let full = Math.floor(mass / 3) - 2;

      if(full < 0){
        full = 0;
      }

      return full;
    }

    async run(){
        console.log(`APP started with ${this.dataset}`)
        
        try{
            const data = await fsPromises.readFile(this.dataset, 'utf8');
            const masses = data.split("\n");
            console.log(masses);

            let totalFullCumulator = 0;
            let fullperPart = 0;

            const totalFull =  masses.reduce( (totalFullCumulator,  mass) =>{
                let fullPerModule  = this.fullMassCalculation({mass});
                
                let extraFull  = this.fullMassCalculation({mass: fullPerModule});
                fullPerModule += extraFull;
                
                while(extraFull > 0){
                  extraFull = this.fullMassCalculation({mass: extraFull});
                  console.log(`Extra full: ${extraFull}  && fullPerModule: ${fullPerModule}`);
                  fullPerModule += extraFull;
                }
                return totalFullCumulator + fullPerModule;
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