'use strict';
const gateway = require('./gateway');
const os =  require('os');

async function main(org,assetname){
    try {
        let cpus = os.cpus()
        console.log("getting contract");
        let contract = await gateway.getContractInstance(org);
        console.log('submitting tx');
        let asset = await contract.submitTransaction('GetUsage',assetname);
        console.log(JSON.parse(asset.toString()));
        return JSON.parse(asset.toString());
    } catch(err){
        console.log(err);
    } finally {
        gateway.disconnect();
    }
}
module.exports.run = main;