const fs = require('fs');
const fsPromises = fs.promises;

const Dataset = "../dataset/day0-1"

class App {

    constructor({dataset}) {
      this.dataset = dataset;
    }

    FuelMassCalculation ({mass}){

      let fuel = Math.floor(mass / 3) - 2;

      if(fuel < 0){
        fuel = 0;
      }

      return fuel;
    }

    async run(){
        console.log(`APP started with ${this.dataset}`)
        
        try{
            const data = await fsPromises.readFile(this.dataset, 'utf8');
            const masses = data.split("\n");
            console.log(masses);

            let totalFuelCumulator = 0;
            let fuelperPart = 0;

            const totalFuel =  masses.reduce( (totalFuelCumulator,  mass) =>{
                let fuelPerModule  = this.FuelMassCalculation({mass});
                
                let extraFuel  = this.FuelMassCalculation({mass: fuelPerModule});
                fuelPerModule += extraFuel;
                
                while(extraFuel > 0){
                  extraFuel = this.FuelMassCalculation({mass: extraFuel});
                  console.log(`Extra Fuel: ${extraFuel}  && FuelPerModule: ${fuelPerModule}`);
                  fuelPerModule += extraFuel;
                }
                return totalFuelCumulator + fuelPerModule;
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