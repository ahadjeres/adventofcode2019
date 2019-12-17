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
    async nounAndVerbeGenerator({intcodeSet}){
        for (let noun = 0; noun <= 99; noun ++){

            for (let verbe = 0; verbe <= 99; verbe ++){

                let incodeAttempSet = [...intcodeSet];
                incodeAttempSet[1] = noun;
                incodeAttempSet[2] = verbe;
                
                let result  =  await this.intcodeExecution({intcodeSet: incodeAttempSet});
                // console.log(`Result: ${result}`);
                if(result === 19690720){
                    return {
                        noun,
                        verbe
                    }
                }
            }
        }
    }
    async intcodeExecution({intcodeSet}) {

        for (let instructionPointer = 0; instructionPointer < intcodeSet.length; instructionPointer += 0){
            let instuction = {};
            
            if(intcodeSet[instructionPointer] !=  HALT){
                instuction = {
                    instruction: intcodeSet[instructionPointer],
                    parameterA: intcodeSet[instructionPointer + 1],
                    parameterB: intcodeSet[instructionPointer + 2],
                    outputAddress: intcodeSet[instructionPointer + 3],
                }  
                instructionPointer += 4;  
            }else{
                instuction = {
                    instruction: intcodeSet[instructionPointer]
                }  
                instructionPointer ++; 
            }
   
            // console.log(`Instruction set: ${JSON.stringify(instuction, 0, 4)}`);

            if(instuction.instruction === ADDITION){
                intcodeSet[instuction.outputAddress] = intcodeSet[instuction.parameterA] + intcodeSet[instuction.parameterB];
                // console.log(`ADD value: ${intcodeSet[instuction.outputAddress]}  @ ADDRESS: ${instuction.outputAddress} VALIDATE: ${intcodeSet[instuction.outputAddress]}`);
            }
            if(instuction.instruction === MULTIPLICATION){
                intcodeSet[instuction.outputAddress] = intcodeSet[instuction.parameterA] * intcodeSet[instuction.parameterB];
                // console.log(`MULT value: ${intcodeSet[instuction.outputAddress]}  @ ADDRESS: ${instuction.outputAddress} VALIDATE: ${intcodeSet[instuction.outputAddress]}`);
            }
            if(instuction.instruction === HALT){
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
    
        //run
        try{
            const result =  await this.nounAndVerbeGenerator({intcodeSet});
            if(result){
                console.log(`here is the final NOUN:  ${result.noun} VERBE; ${result.verbe}` );
            }else{
                console.log(`no result found`);
            }
            
        }catch(e){
            throw e;
        }

    }
  }
  let app = new App({dataset: Dataset});
  app.run();