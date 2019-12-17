const fs = require('fs');
const fsPromises = fs.promises;

const Dataset = "../dataset/day2"

// OPCODE
const ADDITION = 1;
const MULTIPLICATION = 2;
const HALT = 99;


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

    async intcodeExecution({intcodeSet}) {

        for (let index = 0; index < intcodeSet.length; index += 4){

            const  instuction = {
                opcode: intcodeSet[index],
                inputAddressA: intcodeSet[index + 1],
                inputAddressB: intcodeSet[index + 2],
                outputAddress: intcodeSet[index + 3],
            }       
            console.log(`Instruction set: ${JSON.stringify(instuction, 0, 4)}`);

            if(instuction.opcode == ADDITION){
                intcodeSet[instuction.outputAddress] = intcodeSet[instuction.inputAddressA] + intcodeSet[instuction.inputAddressB];
                console.log(`ADD value: ${intcodeSet[instuction.outputAddress]}  @ ADDRESS: ${instuction.outputAddress} VALIDATE: ${intcodeSet[instuction.outputAddress]}`);
            }
            if(instuction.opcode == MULTIPLICATION){
                intcodeSet[instuction.outputAddress] = intcodeSet[instuction.inputAddressA] * intcodeSet[instuction.inputAddressB];
                console.log(`MULT value: ${intcodeSet[instuction.outputAddress]}  @ ADDRESS: ${instuction.outputAddress} VALIDATE: ${intcodeSet[instuction.outputAddress]}`);
            }
            if(instuction.opcode === HALT){
                return intcodeSet[0];
            } 
        }

    }
    async run(){
        console.log(`APP started with ${this.dataset}`)
        let rawData = await this.loadDataFromFile();
        const intcodeSetString  = rawData.split(',');
        // converte to Int
        const intcodeSet =  intcodeSetString.map(item => Number(item));

        // set initial values
        intcodeSet[1] = 12;
        intcodeSet[2] = 2;
    
        //run
        const result =  await this.intcodeExecution({intcodeSet});

       console.log(`here is the final value ${result}`);

    }
  }
  let app = new App({dataset: Dataset});
  app.run();