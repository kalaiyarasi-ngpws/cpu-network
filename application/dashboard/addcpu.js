'use strict';
const gateway = require("./gateway.js")
async function main(org,channelName,contractName,cpuName){
    try {
        //Getting the contract
        let contract = await gateway.getContract(org,channelName,contractName);
        //Submitting the TX
        console.log("Submitting the TX");
        // console.log(contract);
        let buffer = await contract.submitTransaction('AddCPU',cpuName);
        //Converting to json
        let asset =JSON.parse(buffer.toString());
        gateway.errorHandler(asset,"Empty asset")
        console.log(asset);
        return asset;
    } catch (error) {
        console.error(error)
        throw new Error(error);
    }finally{
        gateway.disconnect();
    }
}
main('ngp','cpuchannel','cpu','cpu-5').then(()=> console.log("TX submitted!!")).catch(e => console.error(e));